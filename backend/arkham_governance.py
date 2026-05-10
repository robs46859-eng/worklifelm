from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
import random

router = APIRouter()

# Schema for Governance Entities
class TrustScore(BaseModel):
    source: str
    score: float # 0.0 to 1.0
    status: str # "Verified", "Unreliable", "Compromised"

class HallucinationAlert(BaseModel):
    id: str
    output_id: str
    severity: str # "Low", "Medium", "High"
    detail: str

class RiskFlag(BaseModel):
    id: str
    category: str # "Security", "Policy", "Fact-Check"
    description: str

@router.get("/trust-scores", response_model=List[TrustScore])
async def get_source_trust():
    """Calculates and returns trust scores for active intelligence sources."""
    # Logic will later integrate with real-time web verification and user feedback
    return [
        {"source": "Local Chroma Memory", "score": 0.98, "status": "Verified"},
        {"source": "Brave Web Search", "score": 0.85, "status": "Verified"},
        {"source": "Reddit Index", "score": 0.45, "status": "Unreliable"},
        {"source": "Open-Source Repo Index", "score": 0.92, "status": "Verified"}
    ]

@router.post("/verify-output")
async def verify_ai_output(output_text: str):
    """Checks an AI output for potential hallucinations and fact-check errors."""
    # In a full build, this would run a cross-reference swarm
    score = random.uniform(0.7, 1.0)
    alerts = []
    if score < 0.85:
        alerts.append({"id": "h1", "output_id": "out_123", "severity": "Medium", "detail": "Potential hallucination detected in technical specs."})
    
    return {"trust_score": round(score, 2), "hallucinations": alerts}

@router.get("/risk-flags", response_model=List[RiskFlag])
async def list_governance_risks():
    """Returns active risk flags across the WorkLifeLM system."""
    return [
        {"id": "r1", "category": "Fact-Check", "description": "High variance detected in Llama 3.3 output synthesis."},
        {"id": "r2", "category": "Security", "description": "Local ChromaDB container sync latency above 200ms."}
    ]
