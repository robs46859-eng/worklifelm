import chromadb
import uuid
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()

# Initialize ChromaDB client pointing to the Docker container from Milestone 0
try:
    chroma_client = chromadb.HttpClient(host="localhost", port=8000)
    # Get or create the workspace memory collection
    memory_collection = chroma_client.get_or_create_collection(name="workspace_memory")
except Exception as e:
    print(f"Warning: Could not connect to local ChromaDB: {e}")
    memory_collection = None

class MemorySaveRequest(BaseModel):
    project_id: str
    content: str
    metadata: Optional[dict] = {}

class MemoryRecallResponse(BaseModel):
    id: str
    content: str
    metadata: dict
    distance: Optional[float] = None

@router.post("/save")
async def save_memory(request: MemorySaveRequest):
    """Saves a new memory context into the local workspace vector database."""
    if memory_collection is None:
        raise HTTPException(status_code=503, detail="ChromaDB vector database is unreachable.")
    
    memory_id = str(uuid.uuid4())
    
    # Enrich metadata with timestamp
    enriched_metadata = {
        "project_id": request.project_id,
        "saved_at": datetime.utcnow().isoformat(),
        **request.metadata
    }
    
    try:
        memory_collection.add(
            documents=[request.content],
            metadatas=[enriched_metadata],
            ids=[memory_id]
        )
        return {"status": "success", "message": "Memory saved.", "memory_id": memory_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save memory: {str(e)}")


@router.get("/recall/{project_id}", response_model=List[MemoryRecallResponse])
async def recall_memories(project_id: str, query: Optional[str] = None, limit: int = 5):
    """
    Recalls memories for a specific project.
    If a query is provided, performs a semantic search. Otherwise, returns recent memories.
    """
    if memory_collection is None:
        raise HTTPException(status_code=503, detail="ChromaDB vector database is unreachable.")
        
    try:
        if query:
            # Perform semantic vector search
            results = memory_collection.query(
                query_texts=[query],
                n_results=limit,
                where={"project_id": project_id}
            )
            
            recalled = []
            if results and results.get("documents") and len(results["documents"]) > 0:
                for i in range(len(results["documents"][0])):
                    recalled.append(MemoryRecallResponse(
                        id=results["ids"][0][i],
                        content=results["documents"][0][i],
                        metadata=results["metadatas"][0][i],
                        distance=results["distances"][0][i] if "distances" in results else None
                    ))
            return recalled
        else:
            # Perform a standard fetch filtered by project_id
            results = memory_collection.get(
                where={"project_id": project_id},
                limit=limit
            )
            
            recalled = []
            if results and results.get("documents"):
                for i in range(len(results["documents"])):
                    recalled.append(MemoryRecallResponse(
                        id=results["ids"][i],
                        content=results["documents"][i],
                        metadata=results["metadatas"][i]
                    ))
            return recalled
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to recall memories: {str(e)}")


@router.delete("/delete/{memory_id}")
async def delete_memory(memory_id: str):
    """Deletes a specific memory by its ID."""
    if memory_collection is None:
        raise HTTPException(status_code=503, detail="ChromaDB vector database is unreachable.")
        
    try:
        memory_collection.delete(ids=[memory_id])
        return {"status": "success", "message": f"Memory {memory_id} deleted."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete memory: {str(e)}")
