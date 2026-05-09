from fastapi import FastAPI, Request, HTTPException, Depends
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
from typing import AsyncGenerator, Optional
from auth import (
    init_auth_db, create_user, authenticate_user, create_token,
    get_current_user, check_rate_limit, record_usage, get_usage_summary,
    get_user_by_id, update_user_tier,
)
from billing import (
    create_checkout_session, handle_webhook_event, create_billing_portal,
    STRIPE_PUBLISHABLE_KEY,
)

app = FastAPI(title="WorkLifeLM Brain API")

# Initialize auth database on startup
@app.on_event("startup")
def startup():
    init_auth_db()

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

class RegisterPayload(BaseModel):
    email: str
    password: str
    name: str = ""

class LoginPayload(BaseModel):
    email: str
    password: str

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


# =====================================================================
#  AUTH ENDPOINTS
# =====================================================================

@app.post("/api/auth/register")
async def register(payload: RegisterPayload):
    """Register a new user account."""
    if len(payload.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    user = create_user(payload.email, payload.password, payload.name)
    token = create_token(user)
    return {
        "status": "registered",
        "token": token,
        "user": {"id": user["id"], "email": user["email"], "name": user["name"], "tier": user["tier"]},
    }


@app.post("/api/auth/login")
async def login(payload: LoginPayload):
    """Login and receive a JWT token."""
    user = authenticate_user(payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token(user)
    return {
        "status": "authenticated",
        "token": token,
        "user": {"id": user["id"], "email": user["email"], "name": user["name"], "tier": user["tier"]},
    }


@app.get("/api/auth/profile")
async def profile(request: Request):
    """Get current user profile and usage summary."""
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    usage = get_usage_summary(user["id"], user["tier"])
    return {
        "user": {"id": user["id"], "email": user["email"], "name": user["name"], "tier": user["tier"]},
        "usage": usage,
    }


@app.get("/api/auth/usage")
async def usage_endpoint(request: Request):
    """Get detailed usage for the current user."""
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return get_usage_summary(user["id"], user["tier"])


# =====================================================================
#  BILLING ENDPOINTS
# =====================================================================

class CheckoutPayload(BaseModel):
    tier: str  # 'professional' or 'max'

@app.post("/api/billing/checkout")
async def create_checkout(payload: CheckoutPayload, request: Request):
    """Create a Stripe Checkout session for upgrading."""
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if payload.tier not in ("professional", "max"):
        raise HTTPException(status_code=400, detail="Invalid tier")

    base_url = str(request.base_url).rstrip("/")
    result = create_checkout_session(
        user_id=user["id"],
        user_email=user["email"],
        tier=payload.tier,
        success_url=f"{base_url}/pricing?upgraded=true",
        cancel_url=f"{base_url}/pricing?cancelled=true",
    )
    return {"status": "checkout_created", **result}


@app.post("/api/billing/webhook")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events for subscription lifecycle."""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")
    webhook_secret = os.environ.get("STRIPE_WEBHOOK_SECRET", "")

    try:
        if webhook_secret:
            result = handle_webhook_event(payload, sig_header, webhook_secret)
        else:
            # Without webhook secret, parse event directly (dev mode)
            import stripe
            event = stripe.Event.construct_from(json.loads(payload), stripe.api_key)
            result = {"action": "received", "event_type": event["type"]}
        return {"status": "ok", **result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/billing/portal")
async def billing_portal(request: Request):
    """Create a Stripe Customer Portal session for managing subscriptions."""
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if not user.get("stripe_customer_id"):
        raise HTTPException(status_code=400, detail="No active subscription")

    base_url = str(request.base_url).rstrip("/")
    result = create_billing_portal(user["stripe_customer_id"], f"{base_url}/pricing")
    return {"status": "portal_created", **result}


@app.get("/api/billing/config")
async def billing_config():
    """Return Stripe publishable key for the frontend."""
    return {"publishable_key": STRIPE_PUBLISHABLE_KEY}


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


# =====================================================================
#  PHASE 5 — OUTPUT GENERATORS
# =====================================================================

class OutputRequest(BaseModel):
    topic: str
    project_id: str = "general"
    user_tier: str = "free"
    additional_context: str = ""


async def _generate_output(system_instruction: str, user_prompt: str, model_key: str = "moderate") -> dict:
    """Shared helper: calls the Anthropic API and tracks usage."""
    selected = MODEL_ROUTING[model_key]
    result = await call_anthropic(selected["model"], system_instruction, user_prompt, max_tokens=4096)
    cost = (result["input_tokens"] / 1000 * selected["cost_input_per_1k"]) + (result["output_tokens"] / 1000 * selected["cost_output_per_1k"])
    usage_tracker["total_input_tokens"] += result["input_tokens"]
    usage_tracker["total_output_tokens"] += result["output_tokens"]
    usage_tracker["total_cost"] += cost
    usage_tracker["requests"] += 1
    return {
        "content": result["content"],
        "model_used": result["model"],
        "usage": {"input_tokens": result["input_tokens"], "output_tokens": result["output_tokens"], "cost_usd": round(cost, 6)},
    }


# ----- Report Generator -----
@app.post("/api/outputs/report")
async def generate_report(req: OutputRequest):
    """Generates a structured executive report on the given topic."""
    system = """You are a senior analyst producing executive reports for WorkLifeLM.
Output a complete, well-structured report in markdown with:
- Executive Summary (2-3 sentences)
- Key Findings (bulleted)
- Analysis (2-3 detailed paragraphs)
- Recommendations (numbered action items)
- Risk Factors
- Next Steps with timeline
Be data-driven, concise, and actionable."""

    prompt = f"Generate a comprehensive report on: {req.topic}"
    if req.additional_context:
        prompt += f"\n\nAdditional context: {req.additional_context}"

    result = await _generate_output(system, prompt, "moderate")
    return {"status": "success", "type": "report", "output": result}


# ----- Slide Deck Generator -----
@app.post("/api/outputs/slides")
async def generate_slides(req: OutputRequest):
    """Generates a slide deck as structured JSON slides."""
    system = """You are a presentation designer for WorkLifeLM.
Generate a professional slide deck as a JSON array. Each slide object has:
{"slide_number": 1, "title": "...", "bullets": ["...", "..."], "speaker_notes": "..."}

Rules:
- 8-12 slides total
- First slide is a title slide with subtitle
- Last slide is a "Next Steps / Call to Action" slide
- Keep bullets to 3-5 per slide, concise
- Speaker notes should be 1-2 sentences of context

Output ONLY the JSON array, no markdown fences."""

    prompt = f"Create a pitch/presentation deck on: {req.topic}"
    if req.additional_context:
        prompt += f"\n\nContext: {req.additional_context}"

    result = await _generate_output(system, prompt, "moderate")

    # Try to parse JSON
    slides = []
    try:
        content = result["content"].strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0]
        slides = json.loads(content)
    except Exception:
        slides = [{"slide_number": 1, "title": "Generated Content", "bullets": [result["content"][:500]], "speaker_notes": "Raw output — JSON parsing failed."}]

    return {"status": "success", "type": "slides", "slides": slides, "usage": result["usage"]}


# ----- Mind Map Generator -----
@app.post("/api/outputs/mindmap")
async def generate_mindmap(req: OutputRequest):
    """Generates a mind map as a nested JSON structure."""
    system = """You are a knowledge architect for WorkLifeLM.
Generate a mind map as a JSON object with this recursive structure:
{"label": "Central Topic", "children": [{"label": "Branch 1", "children": [{"label": "Leaf 1"}, {"label": "Leaf 2"}]}, ...]}

Rules:
- Central node is the main topic
- 4-6 primary branches
- Each branch has 2-4 children
- Use concise labels (3-6 words)
- Output ONLY the JSON object, no markdown fences."""

    prompt = f"Create a mind map for: {req.topic}"
    if req.additional_context:
        prompt += f"\n\nContext: {req.additional_context}"

    result = await _generate_output(system, prompt, "simple")

    mindmap = {}
    try:
        content = result["content"].strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0]
        mindmap = json.loads(content)
    except Exception:
        mindmap = {"label": req.topic, "children": [{"label": "See raw output"}]}

    return {"status": "success", "type": "mindmap", "mindmap": mindmap, "usage": result["usage"]}


# ----- Flashcard Generator -----
@app.post("/api/outputs/flashcards")
async def generate_flashcards(req: OutputRequest):
    """Generates study flashcards as a JSON array."""
    system = """You are an educational content creator for WorkLifeLM.
Generate flashcards as a JSON array. Each card:
{"front": "Question or term", "back": "Answer or definition"}

Rules:
- Generate 10-15 flashcards
- Mix conceptual, factual, and application questions
- Keep answers concise but complete
- Output ONLY the JSON array, no markdown fences."""

    prompt = f"Create flashcards covering: {req.topic}"
    if req.additional_context:
        prompt += f"\n\nContext: {req.additional_context}"

    result = await _generate_output(system, prompt, "simple")

    cards = []
    try:
        content = result["content"].strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0]
        cards = json.loads(content)
    except Exception:
        cards = [{"front": "Error", "back": "Could not parse flashcards."}]

    return {"status": "success", "type": "flashcards", "cards": cards, "count": len(cards), "usage": result["usage"]}


# ----- Quiz Generator -----
@app.post("/api/outputs/quiz")
async def generate_quiz(req: OutputRequest):
    """Generates a multiple-choice quiz as a JSON array."""
    system = """You are a quiz builder for WorkLifeLM.
Generate a multiple-choice quiz as a JSON array. Each question:
{"question": "...", "options": ["A) ...", "B) ...", "C) ...", "D) ..."], "correct": "B", "explanation": "..."}

Rules:
- Generate 10 questions
- 4 options each, exactly one correct
- Include a brief explanation for the correct answer
- Output ONLY the JSON array, no markdown fences."""

    prompt = f"Create a quiz on: {req.topic}"
    if req.additional_context:
        prompt += f"\n\nContext: {req.additional_context}"

    result = await _generate_output(system, prompt, "simple")

    questions = []
    try:
        content = result["content"].strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1].rsplit("```", 1)[0]
        questions = json.loads(content)
    except Exception:
        questions = [{"question": "Error", "options": ["A) Could not parse"], "correct": "A", "explanation": "Parsing failed."}]

    return {"status": "success", "type": "quiz", "questions": questions, "count": len(questions), "usage": result["usage"]}


# ----- Audio Overview Script Generator -----
@app.post("/api/outputs/audio-script")
async def generate_audio_script(req: OutputRequest):
    """Generates a conversational podcast-style script for audio overviews."""
    system = """You are a podcast scriptwriter for WorkLifeLM Audio Overviews.
Write a conversational, engaging audio script between two hosts discussing the topic.

Format:
HOST_A: [dialogue]
HOST_B: [dialogue]

Rules:
- 3-5 minute read time (roughly 500-800 words)
- Start with a hook that grabs attention
- Include key insights and takeaways
- End with a clear summary and call to action
- Make it sound natural, not robotic
- Use analogies and examples to explain complex concepts"""

    prompt = f"Write an audio overview script about: {req.topic}"
    if req.additional_context:
        prompt += f"\n\nContext to weave in: {req.additional_context}"

    result = await _generate_output(system, prompt, "moderate")
    return {"status": "success", "type": "audio_script", "script": result["content"], "usage": result["usage"]}


# ----- Pitch Deck (Reverse Pitch) Generator -----
@app.post("/api/outputs/pitch")
async def generate_pitch(req: OutputRequest):
    """The 'Reverse Pitch' feature — the system pitches YOU on the next best move."""
    system = """You are a strategic advisor for WorkLifeLM's Reverse Pitch feature.
The user has provided their project context. Your job is to PITCH THEM on what they should do next.

Structure your pitch as:
1. **The Opportunity** — What you see based on their data
2. **The Angle** — A specific, non-obvious approach
3. **The Numbers** — Revenue/impact estimates (even rough ones)
4. **The Play** — Concrete 3-step execution plan
5. **The Risk** — What could go wrong and the mitigation

Be bold, specific, and actionable. This is not a summary — it's a strategic recommendation."""

    prompt = f"Reverse-pitch me on the next best move for: {req.topic}"
    if req.additional_context:
        prompt += f"\n\nHere's what I know: {req.additional_context}"

    result = await _generate_output(system, prompt, "complex")
    return {"status": "success", "type": "pitch", "pitch": result["content"], "usage": result["usage"]}


# =====================================================================
#  PHASE 7 — OPERATIONAL AGENTS (Operate Mode)
# =====================================================================

class CRMPayload(BaseModel):
    contacts: list[dict] = []  # [{"name": "...", "company": "...", "last_contact": "...", "status": "..."}]
    goal: str = "follow-up"
    project_id: str = "general"

class InvoicePayload(BaseModel):
    items: list[dict] = []  # [{"client": "...", "amount": 100, "status": "pending", "due": "2026-05-15"}]
    action: str = "summary"  # summary | reminder | forecast
    project_id: str = "general"

class TeamPayload(BaseModel):
    team: list[dict] = []  # [{"name": "...", "role": "...", "current_tasks": ["..."]}]
    request: str = ""
    project_id: str = "general"

class OutreachPayload(BaseModel):
    target_audience: str
    product_or_service: str
    tone: str = "professional"
    channel: str = "email"  # email | linkedin | cold-call-script
    count: int = 3
    project_id: str = "general"

class WorkflowPayload(BaseModel):
    description: str
    triggers: list[str] = []
    project_id: str = "general"


# ----- CRM Follow-Up Agent -----
@app.post("/api/agents/crm")
async def crm_agent(payload: CRMPayload):
    """Generates personalized follow-up drafts for CRM contacts."""
    system = """You are a CRM automation agent for WorkLifeLM.
Given a list of contacts with their status and history, generate personalized follow-up messages.

For each contact, output:
- **To:** Contact name (Company)
- **Subject:** Email subject line
- **Body:** 3-5 sentence personalized message
- **Suggested action:** What to do next (call, send proposal, schedule meeting, etc.)

Be warm but professional. Reference any context about the contact. Always include a clear CTA."""

    contacts_str = "\n".join(
        f"- {c.get('name', 'Unknown')} at {c.get('company', 'N/A')}, status: {c.get('status', 'unknown')}, last contact: {c.get('last_contact', 'unknown')}"
        for c in payload.contacts
    ) if payload.contacts else "No contacts provided — generate 3 example follow-up templates for a SaaS business."

    prompt = f"Goal: {payload.goal}\n\nContacts:\n{contacts_str}"
    result = await _generate_output(system, prompt, "moderate")
    return {"status": "success", "type": "crm_followup", "output": result["content"], "usage": result["usage"]}


# ----- Billing / Invoice Agent -----
@app.post("/api/agents/billing")
async def billing_agent(payload: InvoicePayload):
    """Summarizes invoices, generates reminders, or forecasts revenue."""
    actions_map = {
        "summary": "Analyze the invoices and provide an executive billing summary including total outstanding, overdue amount, and collection priority.",
        "reminder": "Generate polite but firm payment reminder emails for each overdue invoice.",
        "forecast": "Based on the invoice data, project revenue for the next 30/60/90 days.",
    }
    system = f"""You are a billing automation agent for WorkLifeLM.
{actions_map.get(payload.action, actions_map['summary'])}

Be precise with numbers. Use tables where helpful. Flag any risk items."""

    items_str = "\n".join(
        f"- {i.get('client', 'Unknown')}: ${i.get('amount', 0)} ({i.get('status', 'unknown')}), due: {i.get('due', 'N/A')}"
        for i in payload.items
    ) if payload.items else "No invoices provided — generate an example billing summary with 5 sample invoices."

    prompt = f"Action: {payload.action}\n\nInvoices:\n{items_str}"
    result = await _generate_output(system, prompt, "moderate")
    return {"status": "success", "type": f"billing_{payload.action}", "output": result["content"], "usage": result["usage"]}


# ----- Employee / Team Management Agent -----
@app.post("/api/agents/team")
async def team_agent(payload: TeamPayload):
    """Manages team task assignments, workload balancing, and status reports."""
    system = """You are a team management agent for WorkLifeLM.
Given the team roster and their current tasks, help the user manage workload.

Capabilities:
- Generate task assignments based on skills and availability
- Identify bottlenecks and overloaded team members
- Create daily/weekly status report summaries
- Suggest workflow improvements

Output structured, actionable recommendations. Use tables for task assignments."""

    team_str = "\n".join(
        f"- {m.get('name', 'Unknown')} ({m.get('role', 'N/A')}): {', '.join(m.get('current_tasks', ['no tasks']))}"
        for m in payload.team
    ) if payload.team else "No team data provided — generate an example team management plan for a 5-person startup."

    prompt = f"Request: {payload.request or 'Generate a team status report and optimization suggestions.'}\n\nTeam:\n{team_str}"
    result = await _generate_output(system, prompt, "moderate")
    return {"status": "success", "type": "team_management", "output": result["content"], "usage": result["usage"]}


# ----- Outreach / Marketing Campaign Agent -----
@app.post("/api/agents/outreach")
async def outreach_agent(payload: OutreachPayload):
    """Generates multi-channel outreach campaigns."""
    channel_instructions = {
        "email": "Generate professional cold outreach emails with subject line, body, and PS line.",
        "linkedin": "Generate LinkedIn connection request messages (300 char limit) and follow-up DMs.",
        "cold-call-script": "Generate a cold-call script with opener, value prop, objection handling, and close.",
    }

    system = f"""You are an outreach and marketing agent for WorkLifeLM.
{channel_instructions.get(payload.channel, channel_instructions['email'])}

Rules:
- Generate {payload.count} unique variations
- Tone: {payload.tone}
- Each variation should have a different angle/hook
- Include personalization placeholders like [Name], [Company]
- End each with a clear CTA"""

    prompt = f"Target audience: {payload.target_audience}\nProduct/Service: {payload.product_or_service}\nChannel: {payload.channel}"
    result = await _generate_output(system, prompt, "moderate")
    return {"status": "success", "type": f"outreach_{payload.channel}", "output": result["content"], "count": payload.count, "usage": result["usage"]}


# ----- Workflow Automation Agent -----
@app.post("/api/agents/workflow")
async def workflow_agent(payload: WorkflowPayload):
    """Designs automation workflows with triggers, actions, and conditions."""
    system = """You are a workflow automation architect for WorkLifeLM.
Design a detailed automation workflow based on the user's description.

Output format:
1. **Workflow Name**
2. **Trigger(s)** — what starts the workflow
3. **Steps** — numbered sequence of actions, each with:
   - Action description
   - Tool/service involved
   - Input → Output
   - Error handling / fallback
4. **Conditions** — any branching logic (if/else)
5. **Schedule** — frequency or event-based
6. **Estimated time saved** per week

Make it implementable. Reference real tools (Zapier, n8n, custom API calls) where applicable."""

    triggers_str = ", ".join(payload.triggers) if payload.triggers else "Not specified"
    prompt = f"Design a workflow for: {payload.description}\nTriggers: {triggers_str}"
    result = await _generate_output(system, prompt, "complex")
    return {"status": "success", "type": "workflow", "output": result["content"], "usage": result["usage"]}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
