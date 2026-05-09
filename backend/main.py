from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import chromadb
from pydantic import BaseModel
import os
import uuid
import json
from datetime import datetime

app = FastAPI(title="WorkLifeLM Brain API")

# CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ChromaDB persistent client
DB_PATH = os.environ.get("CHROMA_DB_PATH", "./data/chroma")
os.makedirs(DB_PATH, exist_ok=True)
chroma_client = chromadb.PersistentClient(path=DB_PATH)

# Create or get the master collection
collection = chroma_client.get_or_create_collection(name="worklifelm_system_brain")

# ----- Tier Definitions -----
TIERS = {
    "free": {
        "notebooks": 100, "sources_per_notebook": 50,
        "chats_per_day": 50, "audio_per_day": 3, "reports_per_day": 10,
        "flashcards_per_day": 10, "quizzes_per_day": 10,
        "video_per_day": 3, "cinematic_per_day": 0,
        "mind_maps_per_day": 10, "deep_research_per_month": 10,
    },
    "professional": {
        "notebooks": 200, "sources_per_notebook": 100,
        "chats_per_day": 200, "audio_per_day": 6, "reports_per_day": 20,
        "flashcards_per_day": 20, "quizzes_per_day": 20,
        "video_per_day": 6, "cinematic_per_day": 2,
        "mind_maps_per_day": 20, "deep_research_per_day": 3,
    },
    "max": {
        "notebooks": 500, "sources_per_notebook": 300,
        "chats_per_day": 500, "audio_per_day": 20, "reports_per_day": 100,
        "flashcards_per_day": 100, "quizzes_per_day": 100,
        "video_per_day": 20, "cinematic_per_day": -1,  # unlimited
        "mind_maps_per_day": 100, "deep_research_per_day": 20,
    },
}

# ----- Tiered Model Router -----
# Maps task complexity to model selection
MODEL_ROUTING = {
    "simple": {"model": "claude-3-haiku-20240307", "label": "Haiku (Fast)", "cost_per_1k": 0.00025},
    "moderate": {"model": "claude-3-5-sonnet-20241022", "label": "Sonnet (Balanced)", "cost_per_1k": 0.003},
    "complex": {"model": "claude-sonnet-4-20250514", "label": "Opus (Deep)", "cost_per_1k": 0.015},
}

SIMPLE_KEYWORDS = ["summarize", "list", "format", "extract", "label", "classify", "tag"]
COMPLEX_KEYWORDS = ["architect", "design", "refactor", "debug", "analyze across", "synthesize", "monetization", "strategy", "reverse pitch"]


def classify_complexity(prompt: str) -> str:
    lower = prompt.lower()
    if any(kw in lower for kw in COMPLEX_KEYWORDS):
        return "complex"
    if any(kw in lower for kw in SIMPLE_KEYWORDS):
        return "simple"
    return "moderate"


# ----- Pydantic Models -----
class IngestionPayload(BaseModel):
    source: str  # e.g., 'github', 'slack', 'notion', 'upload'
    project_id: str
    content: str
    metadata: dict = {}

class SwarmRoutePayload(BaseModel):
    prompt: str
    project_id: str = "general"
    user_tier: str = "free"

class DecisionDebtPayload(BaseModel):
    project_id: str
    assumption: str
    context: str = ""


# ----- Health -----
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "brain_nodes": collection.count(),
        "tiers_available": list(TIERS.keys()),
        "model_routing": {k: v["label"] for k, v in MODEL_ROUTING.items()},
        "timestamp": datetime.utcnow().isoformat(),
    }


# ----- Ingestion -----
@app.post("/api/ingest")
async def ingest_data(payload: IngestionPayload):
    """Ingests data from any source, embeds it, stores in vector memory."""
    try:
        node_id = str(uuid.uuid4())
        collection.add(
            documents=[payload.content],
            metadatas=[{
                "source": payload.source,
                "project": payload.project_id,
                "ingested_at": datetime.utcnow().isoformat(),
                **payload.metadata,
            }],
            ids=[node_id],
        )
        return {
            "status": "success",
            "message": f"Ingested from {payload.source} into project {payload.project_id}",
            "node_id": node_id,
            "total_nodes": collection.count(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ----- Query -----
@app.get("/api/query")
async def query_brain(q: str, project_id: str = None, n_results: int = 5):
    """Semantic search across the system brain."""
    try:
        where_clause = {"project": project_id} if project_id else None
        results = collection.query(
            query_texts=[q],
            n_results=n_results,
            where=where_clause,
        )
        return {"status": "success", "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ----- Swarm Router (Smart Tiered Model Routing) -----
@app.post("/api/swarm/route")
async def swarm_route(payload: SwarmRoutePayload):
    """
    Accepts a natural language prompt, classifies complexity,
    selects the optimal model tier, and returns routing metadata.
    In production this would dispatch to the actual LLM.
    """
    complexity = classify_complexity(payload.prompt)
    selected_model = MODEL_ROUTING[complexity]

    # Pull relevant context from the brain
    context_results = []
    try:
        brain_results = collection.query(
            query_texts=[payload.prompt],
            n_results=3,
            where={"project": payload.project_id} if payload.project_id != "general" else None,
        )
        if brain_results and brain_results.get("documents"):
            context_results = brain_results["documents"][0]
    except Exception:
        pass

    return {
        "status": "routed",
        "complexity": complexity,
        "model": selected_model,
        "user_tier": payload.user_tier,
        "tier_limits": TIERS.get(payload.user_tier, TIERS["free"]),
        "context_retrieved": len(context_results),
        "context_snippets": context_results[:3],
        "prompt": payload.prompt,
        "message": f"Task classified as '{complexity}'. Routing to {selected_model['label']}.",
    }


# ----- Decision Debt Tracker -----
decision_debt_collection = chroma_client.get_or_create_collection(name="decision_debt")

@app.post("/api/decisions/track")
async def track_decision_debt(payload: DecisionDebtPayload):
    """Track an unresolved assumption or decision."""
    node_id = str(uuid.uuid4())
    decision_debt_collection.add(
        documents=[payload.assumption],
        metadatas=[{
            "project": payload.project_id,
            "context": payload.context,
            "status": "unresolved",
            "created_at": datetime.utcnow().isoformat(),
        }],
        ids=[node_id],
    )
    return {
        "status": "tracked",
        "node_id": node_id,
        "total_unresolved": decision_debt_collection.count(),
    }

@app.get("/api/decisions/list")
async def list_decision_debt(project_id: str = None):
    """List all unresolved decisions, optionally filtered by project."""
    try:
        where_clause = {"project": project_id} if project_id else None
        results = decision_debt_collection.get(where=where_clause)
        return {"status": "success", "decisions": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ----- GitHub Webhook Handler -----
@app.post("/api/webhooks/github")
async def github_webhook(request: Request):
    """
    Receives GitHub push/PR events, extracts commit messages and
    changed file paths, and ingests them into the system brain.
    """
    try:
        body = await request.json()
        event_type = request.headers.get("X-GitHub-Event", "push")

        if event_type == "push":
            repo_name = body.get("repository", {}).get("full_name", "unknown")
            commits = body.get("commits", [])
            for commit in commits:
                content = (
                    f"Commit to {repo_name}\n"
                    f"Author: {commit.get('author', {}).get('name', 'unknown')}\n"
                    f"Message: {commit.get('message', '')}\n"
                    f"Files modified: {', '.join(commit.get('modified', []))}\n"
                    f"Files added: {', '.join(commit.get('added', []))}\n"
                )
                collection.add(
                    documents=[content],
                    metadatas=[{
                        "source": "github",
                        "project": repo_name,
                        "event": "push",
                        "sha": commit.get("id", ""),
                        "ingested_at": datetime.utcnow().isoformat(),
                    }],
                    ids=[str(uuid.uuid4())],
                )
            return {"status": "ingested", "commits_processed": len(commits)}

        elif event_type == "pull_request":
            pr = body.get("pull_request", {})
            content = (
                f"Pull Request: {pr.get('title', '')}\n"
                f"Body: {pr.get('body', '')}\n"
                f"State: {pr.get('state', '')}\n"
                f"Author: {pr.get('user', {}).get('login', 'unknown')}\n"
            )
            collection.add(
                documents=[content],
                metadatas=[{
                    "source": "github",
                    "project": body.get("repository", {}).get("full_name", "unknown"),
                    "event": "pull_request",
                    "ingested_at": datetime.utcnow().isoformat(),
                }],
                ids=[str(uuid.uuid4())],
            )
            return {"status": "ingested", "event": "pull_request"}

        return {"status": "ignored", "event": event_type}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ----- Suggested Prompts -----
@app.get("/api/prompts/suggested")
async def suggested_prompts(project_id: str = "general"):
    """Returns pre-made suggested prompts based on project context."""
    general_prompts = [
        {"label": "Cross-Project Revenue", "prompt": "Show me all monetization paths across my active projects", "complexity": "complex"},
        {"label": "Weekly Summary", "prompt": "Summarize all activity across my repos from the past week", "complexity": "moderate"},
        {"label": "Decision Review", "prompt": "List all unresolved assumptions and decision debt", "complexity": "simple"},
        {"label": "Pitch Deck", "prompt": "Generate a pitch deck for this project based on current progress and market data", "complexity": "complex"},
        {"label": "Agent Status", "prompt": "Show the status of all active swarm agents and their recent outputs", "complexity": "simple"},
        {"label": "Outreach Draft", "prompt": "Draft outreach emails for the top 5 leads in the CRM pipeline", "complexity": "moderate"},
        {"label": "Architecture Review", "prompt": "Analyze the current system architecture and suggest optimizations", "complexity": "complex"},
        {"label": "Billing Check", "prompt": "Summarize outstanding invoices and upcoming billing events", "complexity": "simple"},
    ]
    return {"status": "success", "prompts": general_prompts}


# ----- Stats / Dashboard Data -----
@app.get("/api/stats")
async def system_stats():
    """Returns live system stats for the dashboard top bar."""
    return {
        "brain_nodes": collection.count(),
        "decision_debt_count": decision_debt_collection.count(),
        "active_models": [m["label"] for m in MODEL_ROUTING.values()],
        "api_spend_today": 12.40,  # placeholder — would be tracked via usage table
        "system_healthy": True,
        "timestamp": datetime.utcnow().isoformat(),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
