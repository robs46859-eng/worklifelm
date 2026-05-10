import asyncio
import os
import chromadb
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

router = APIRouter()

# Schema for the search request
class SearchQuery(BaseModel):
    query: str
    engines: Optional[List[str]] = ["brave", "workspace"]

# Schema for the search response
class SearchResult(BaseModel):
    ai_summary: str
    sources: Dict[str, List[Dict[str, Any]]]

async def search_brave_mcp(query: str) -> List[Dict[str, Any]]:
    """Query the Brave Search MCP server for web results."""
    try:
        env = os.environ.copy()
        # Ensure Brave API Key is available
        if "BRAVE_API_KEY" not in env:
            raise HTTPException(status_code=500, detail="BRAVE_API_KEY not found in environment.")
            
        server_params = StdioServerParameters(
            command="npx",
            args=["-y", "@modelcontextprotocol/server-brave-search"],
            env=env
        )
        
        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                
                result = await session.call_tool("brave_web_search", arguments={"query": query})
                
                # Brave MCP returns a text block containing JSON or formatted text.
                # In a robust implementation, we would parse the JSON.
                # For this MVP, we wrap the text response.
                if result.content and len(result.content) > 0:
                    text_content = result.content[0].text
                    return [{"title": "Brave Web Search Results", "url": "https://search.brave.com", "snippet": text_content[:500] + "..."}]
                return []
    except Exception as e:
        print(f"Brave Search Error: {e}")
        return [{"title": "Error", "snippet": f"Failed to connect to Brave MCP: {str(e)}"}]

async def search_workspace_memory(query: str) -> List[Dict[str, Any]]:
    """Query the local ChromaDB for workspace context."""
    try:
        # Assuming ChromaDB is running locally via Docker as set up in Milestone 0
        client = chromadb.HttpClient(host="localhost", port=8000)
        collection = client.get_collection(name="knowledge_base")
        
        results = collection.query(
            query_texts=[query],
            n_results=3
        )
        
        formatted_results = []
        if results and 'documents' in results and len(results['documents']) > 0:
            for i, doc in enumerate(results['documents'][0]):
                dist = results['distances'][0][i]
                # Only include relevant matches (threshold depends on distance metric)
                formatted_results.append({
                    "title": f"Workspace Context {i+1}",
                    "snippet": doc,
                    "distance": dist
                })
        return formatted_results
    except Exception as e:
        print(f"ChromaDB Error: {e}")
        # Return empty list if Chroma is not reachable, instead of breaking the search
        return []

async def generate_ai_summary(query: str, brave_results: List[Dict], workspace_results: List[Dict]) -> str:
    """Generate a synthesized summary of the search results using an LLM."""
    try:
        from openai import AsyncOpenAI
        
        # We use Groq for lightning-fast inference to power the DAD summary
        api_key = os.environ.get("GROQ_API_KEY")
        if not api_key:
            return "AI Summary unavailable. GROQ_API_KEY not set."
        
        client = AsyncOpenAI(
            api_key=api_key,
            base_url="https://api.groq.com/openai/v1"
        )
        
        context = f"Workspace Data:\n{workspace_results}\n\nWeb Data:\n{brave_results}"
        
        system_prompt = \"\"\"You are DAD (Deus Absconditus Daemon), a persistent, highly technical assistant.
        You are processing a search query. Combine the provided Workspace Data and Web Data to write a dense, compressed 'Neural Synthesis' summary.
        Do not use conversational filler. Be direct and analytical.\"\"\"
        
        response = await client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Query: {query}\n\nContext:\n{context}"}
            ],
            max_tokens=300,
            temperature=0.2
        )
        
        return response.choices[0].message.content
    except Exception as e:
        print(f"LLM Synthesis Error: {e}")
        return "AI Summary unavailable. Please check API keys and connectivity."

@router.post("/search", response_model=SearchResult)
async def perform_search(search_query: SearchQuery):
    """
    Browser-Lite routing endpoint.
    Orchestrates searches across multiple engines and synthesizes a summary.
    """
    print(f"🔍 DAD received search intent: '{search_query.query}'")
    
    # Run searches concurrently for speed
    tasks = []
    if "brave" in search_query.engines:
        tasks.append(search_brave_mcp(search_query.query))
    else:
        tasks.append(asyncio.sleep(0, result=[]))
        
    if "workspace" in search_query.engines:
        tasks.append(search_workspace_memory(search_query.query))
    else:
        tasks.append(asyncio.sleep(0, result=[]))
        
    brave_results, workspace_results = await asyncio.gather(*tasks)
    
    # Generate the AI Summary
    print("🧠 DAD synthesizing context...")
    ai_summary = await generate_ai_summary(search_query.query, brave_results, workspace_results)
    
    # Format the final response to match the DAD UI expectations
    return SearchResult(
        ai_summary=ai_summary,
        sources={
            "Brave Web": brave_results,
            "Local Workspace": workspace_results
        }
    )

# --- Sheepish Reminder Endpoints ---

class ReminderRequest(BaseModel):
    action_type: str # e.g., "search", "repo_index"
    target: str

@router.post("/reminder")
async def get_sheepish_reminder(req: ReminderRequest):
    """
    Returns soft contextual nudges based on DAD's philosophy.
    e.g., "You searched this last week."
    """
    # Placeholder logic for MVP. In production, this queries user history from Chroma/SQLite.
    nudges = {
        "repo_index": f"I already indexed {req.target}.",
        "search": f"You searched for '{req.target}' last week. Want me to pull up those notes?",
        "architecture": f"Careful: {req.target} might conflict with your current architecture."
    }
    
    return {"nudge": nudges.get(req.action_type, "I'm monitoring the workspace.")}
