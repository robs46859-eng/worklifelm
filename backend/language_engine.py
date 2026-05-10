from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
from openai import AsyncOpenAI

router = APIRouter()

# Schema for requests
class TranslationRequest(BaseModel):
    text: str
    target_dialect: str # e.g., "Mexican Spanish", "Bavarian German"

class LessonRequest(BaseModel):
    topic: str
    industry: Optional[str] = "General"
    level: Optional[str] = "Beginner"

async def call_language_llm(system_prompt: str, user_prompt: str):
    """Utility to call the primary LLM (Groq/Llama) for language tasks."""
    try:
        api_key = os.environ.get("GROQ_API_KEY")
        client = AsyncOpenAI(api_key=api_key, base_url="https://api.groq.com/openai/v1")
        
        response = await client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.3
        )
        return response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Language Engine Error: {str(e)}")

@router.post("/translate")
async def translate_dialect(req: TranslationRequest):
    """Handles dialect-aware translations."""
    system_prompt = f"You are a master linguist specializing in {req.target_dialect}. Translate the provided text accurately, preserving cultural nuance and specific dialect markers."
    translation = await call_language_llm(system_prompt, req.text)
    return {"original": req.text, "dialect": req.target_dialect, "translation": translation}

@router.post("/generate-lesson")
async def generate_lesson(req: LessonRequest):
    """Generates a structured language lesson plan."""
    system_prompt = f"You are an expert language instructor for the {req.industry} industry. Create a high-density, {req.level}-level lesson plan."
    user_prompt = f"Create a lesson plan about: {req.topic}. Include vocabulary, common phrases, and a short cultural context note."
    lesson_plan = await call_language_llm(system_prompt, user_prompt)
    return {"topic": req.topic, "lesson_plan": lesson_plan}
