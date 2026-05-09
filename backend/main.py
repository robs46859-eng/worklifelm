from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import chromadb
from pydantic import BaseModel
import os
import uuid
import json
import httpx
import asyncio
from datetime import datetime
from typing import AsyncGenerator

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

# Anthropic API key — loaded from environment
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

# ----- Usage Tracker (in-memory, per-session) -----
usage_tracker = {
    "total_input_tokens": 0,
    "total_output_tokens": 0,
    "total_cost": 0.0,
    "requests": 0,
}

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
MODEL_ROUTING = {
    "simple": {"model": "claude-haiku-4-5-20251001", "label": "Haiku 4.5 (Fast)", "cost_input_per_1k": 0.001, "cost_output_per_1k": 0.005},
    "moderate": {"model": "claude-sonnet-4-6", "label": "Sonnet 4.6 (Balanced)", "cost_input_per_1k": 0.003, "cost_output_per_1k": 0.015},
    "complex": {"model": "claude-opus-4-7", "label": "Opus 4.7 (Deep)", "cost_input_per_1k": 0.015, "cost_output_per_1k": 0.075},
}

SIMPLE_KEYWORDS = ["summarize", "list", "format", "extract", "label", "classify", "tag", "status", "check", "show"]
COMPLEX_KEYWORDS = ["architect", "design", "refactor", "debug", "analyze across", "synthesize", "monetization", "strategy", "reverse pitch", "pitch deck", "generate a pitch", "cross-project"]

# ----- System Prompt -----
SYSTEM_PROMPT = """You are WorkLifeLM, a production-focused AI orchestration assistant. You are the central brain for a user's entire work ecosystem.

Your capabilities:
- Cross-project analysis and synthesis across multiple business verticals
- Code architecture review and generation (feeding into Codex, Godot, etc.)
- Business operations: outreach drafts, CRM updates, billing summaries
- Revenue analysis and monetization path identification
- Decision debt tracking — flagging unresolved assumptions
- Pitch generation, marketing copy, and branding assistance

You have access to the user's system brain (vector memory) containing ingested data from GitHub repos, Slack messages, documents, and other sources. When context is provided below, use it to ground your responses in the user's actual data.

Always be:
1. Actionable — give concrete next steps, not vague advice
2. Data-grounded — reference the context provided when relevant
3. Structured — use headers, bullets, and clear formatting
4. Efficiency-minded — suggest automation opportunities

Current mode context will be provided. Adapt your response style accordingly:
- Build Mode: Focus on code, architecture, system design
- Operate Mode: Focus on business processes, outreach, CRM, billing
- Analyze Mode: Focus on patterns, gaps, monetization, cross-project insights"""


def classify_complexity(prompt: str) -> str:
    lower = prompt.lower()
    if any(kw in lower for kw in COMPLEX_KEYWORDS):
        return "complex"
    if any(kw in lower for kw in SIMPLE_KEYWORDS):
        return "simple"
    return "moderate"


async def call_anthropic(model: str, system: str, user_message: str, max_tokens: int = 2048) -> dict:
    """Call the Anthropic Messages API and return the response."""
    if not ANTHROPIC_API_KEY:
        return {
            "content": "⚠️ No Anthropic API key configured. Set ANTHROPIC_API_KEY in the backend environment to enable live LLM responses.\n\nIn the meantime, your prompt was successfully routed and classified.",
            "input_tokens": 0,
            "output_tokens": 0,
            "model": model,
        }

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
            json={
                "model": model,
                "max_tokens": max_tokens,
                "system": system,
                "messages": [{"role": "user", "content": user_message}],
            },
        )

        if response.status_code != 200:
            error_body = response.text
            return {
                "content": f"API Error ({response.status_code}): {error_body[:500]}",
                "input_tokens": 0,
                "output_tokens": 0,
                "model": model,
            }

        data = response.json()
        content_blocks = data.get("content", [])
        text = "\n".join(block.get("text", "") for block in content_blocks if block.get("type") == "text")
        usage = data.get("usage", {})

        return {
            "content": text,
            "input_tokens": usage.get("input_tokens", 0),
            "output_tokens": usage.get("output_tokens", 0),
            "model": data.get("model", model),
        }


async def stream_anthropic(model: str, system: str, user_message: str, max_tokens: int = 2048) -> AsyncGenerator[str, None]:
    """Stream from the Anthropic Messages API using SSE."""
    if not ANTHROPIC_API_KEY:
        yield f"data: {json.dumps({'type': 'content_block_delta', 'delta': {'text': '⚠️ No API key configured. Set ANTHROPIC_API_KEY to enable streaming.'}})}\n\n"
        yield f"data: {json.dumps({'type': 'message_stop'})}\n\n"
        return

    async with httpx.AsyncClient(timeout=120.0) as client:
        async with client.stream(
            "POST",
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
            json={
                "model": model,
                "max_tokens": max_tokens,
                "stream": True,
                "system": system,
                "messages": [{"role": "user", "content": user_message}],
            },
        ) as response:
            async for line in response.aiter_lines():
                if line.startswith("data: "):
                    yield f"{line}\n\n"


# ----- Pydantic Models -----
class IngestionPayload(BaseModel):
    source: str
    project_id: str
    content: str
    metadata: dict = {}

class SwarmRoutePayload(BaseModel):
    prompt: str
    project_id: str = "general"
    user_tier: str = "free"
    stream: bool = False

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
        "api_key_configured": bool(ANTHROPIC_API_KEY),
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


# ----- Swarm Router (LIVE LLM Integration) -----
@app.post("/api/swarm/route")
async def swarm_route(payload: SwarmRoutePayload):
    """
    The core intelligence endpoint:
    1. Classifies prompt complexity
    2. Selects optimal model tier (Haiku / Sonnet / Sonnet 4)
    3. Retrieves relevant context from the vector brain
    4. Calls the Anthropic API with context-augmented prompt
    5. Returns the full LLM response with routing metadata
    """
    complexity = classify_complexity(payload.prompt)
    selected_model = MODEL_ROUTING[complexity]

    # Pull relevant context from the brain
    context_snippets = []
    try:
        brain_results = collection.query(
            query_texts=[payload.prompt],
            n_results=5,
            where={"project": payload.project_id} if payload.project_id != "general" else None,
        )
        if brain_results and brain_results.get("documents"):
            context_snippets = [doc for doc in brain_results["documents"][0] if doc]
    except Exception:
        pass

    # Build augmented prompt with retrieved context
    augmented_prompt = payload.prompt
    if context_snippets:
        context_block = "\n---\n".join(context_snippets[:5])
        augmented_prompt = f"""## Retrieved Context from System Brain
{context_block}

## User Request
{payload.prompt}

Use the context above to ground your response in the user's actual data where relevant."""

    # Stream response
    if payload.stream:
        return StreamingResponse(
            stream_anthropic(selected_model["model"], SYSTEM_PROMPT, augmented_prompt),
            media_type="text/event-stream",
        )

    # Non-streaming: call Anthropic API
    llm_result = await call_anthropic(selected_model["model"], SYSTEM_PROMPT, augmented_prompt)

    # Track usage
    input_tokens = llm_result["input_tokens"]
    output_tokens = llm_result["output_tokens"]
    cost = (input_tokens / 1000 * selected_model["cost_input_per_1k"]) + (output_tokens / 1000 * selected_model["cost_output_per_1k"])
    usage_tracker["total_input_tokens"] += input_tokens
    usage_tracker["total_output_tokens"] += output_tokens
    usage_tracker["total_cost"] += cost
    usage_tracker["requests"] += 1

    return {
        "status": "completed",
        "complexity": complexity,
        "model": selected_model,
        "model_used": llm_result["model"],
        "user_tier": payload.user_tier,
        "tier_limits": TIERS.get(payload.user_tier, TIERS["free"]),
        "context_retrieved": len(context_snippets),
        "context_snippets": context_snippets[:3],
        "response": llm_result["content"],
        "usage": {
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "cost_usd": round(cost, 6),
        },
        "message": f"Completed via {selected_model['label']} ({complexity} complexity). {input_tokens + output_tokens} tokens used.",
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
        "api_spend_today": round(usage_tracker["total_cost"], 4),
        "total_requests": usage_tracker["requests"],
        "total_tokens": usage_tracker["total_input_tokens"] + usage_tracker["total_output_tokens"],
        "system_healthy": True,
        "api_key_configured": bool(ANTHROPIC_API_KEY),
        "timestamp": datetime.utcnow().isoformat(),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
