"""
WorkLifeLM Integrations Scaffold
OAuth2 flows, webhook handlers, and data sync for 3rd party services.
"""
import os
import sqlite3
from datetime import datetime
from auth import DB_PATH


def init_integrations_db():
    """Add integrations and related tables to the auth DB."""
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS integrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            provider TEXT NOT NULL,
            access_token TEXT,
            refresh_token TEXT,
            token_expires_at TEXT,
            workspace_id TEXT,
            config TEXT DEFAULT '{}',
            status TEXT DEFAULT 'active',
            last_sync TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS saved_outputs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            output_type TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            file_format TEXT DEFAULT 'md',
            project_id TEXT DEFAULT 'general',
            archived INTEGER DEFAULT 0,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS collaborators (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id TEXT NOT NULL,
            owner_id INTEGER NOT NULL,
            collaborator_id INTEGER NOT NULL,
            role TEXT DEFAULT 'viewer',
            invited_at TEXT DEFAULT CURRENT_TIMESTAMP,
            accepted INTEGER DEFAULT 0,
            FOREIGN KEY (owner_id) REFERENCES users(id),
            FOREIGN KEY (collaborator_id) REFERENCES users(id)
        )
    """)
    conn.commit()
    conn.close()


# ----- Integration CRUD -----
def save_integration(user_id: int, provider: str, access_token: str, refresh_token: str = "",
                     workspace_id: str = "", config: str = "{}") -> int:
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "INSERT INTO integrations (user_id, provider, access_token, refresh_token, workspace_id, config) VALUES (?, ?, ?, ?, ?, ?)",
        (user_id, provider, access_token, refresh_token, workspace_id, config)
    )
    conn.commit()
    row_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.close()
    return row_id


def get_user_integrations(user_id: int) -> list:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT id, provider, status, last_sync, created_at FROM integrations WHERE user_id = ?", (user_id,)).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def delete_integration(user_id: int, integration_id: int) -> bool:
    conn = sqlite3.connect(DB_PATH)
    conn.execute("DELETE FROM integrations WHERE id = ? AND user_id = ?", (integration_id, user_id))
    conn.commit()
    conn.close()
    return True


# ----- Saved Outputs -----
def save_output(user_id: int, output_type: str, title: str, content: str,
                file_format: str = "md", project_id: str = "general") -> int:
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "INSERT INTO saved_outputs (user_id, output_type, title, content, file_format, project_id) VALUES (?, ?, ?, ?, ?, ?)",
        (user_id, output_type, title, content, file_format, project_id)
    )
    conn.commit()
    row_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.close()
    return row_id


def get_user_outputs(user_id: int, archived: bool = False) -> list:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute(
        "SELECT id, output_type, title, file_format, project_id, archived, created_at FROM saved_outputs WHERE user_id = ? AND archived = ? ORDER BY created_at DESC",
        (user_id, 1 if archived else 0)
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_output_by_id(user_id: int, output_id: int) -> dict:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    row = conn.execute("SELECT * FROM saved_outputs WHERE id = ? AND user_id = ?", (output_id, user_id)).fetchone()
    conn.close()
    return dict(row) if row else {}


def archive_output(user_id: int, output_id: int) -> bool:
    conn = sqlite3.connect(DB_PATH)
    conn.execute("UPDATE saved_outputs SET archived = 1 WHERE id = ? AND user_id = ?", (output_id, user_id))
    conn.commit()
    conn.close()
    return True


def unarchive_output(user_id: int, output_id: int) -> bool:
    conn = sqlite3.connect(DB_PATH)
    conn.execute("UPDATE saved_outputs SET archived = 0 WHERE id = ? AND user_id = ?", (output_id, user_id))
    conn.commit()
    conn.close()
    return True


def delete_output(user_id: int, output_id: int) -> bool:
    conn = sqlite3.connect(DB_PATH)
    conn.execute("DELETE FROM saved_outputs WHERE id = ? AND user_id = ?", (output_id, user_id))
    conn.commit()
    conn.close()
    return True


# ----- Collaborators -----
def invite_collaborator(owner_id: int, project_id: str, collaborator_email: str, role: str = "viewer") -> dict:
    """Invite a user to collaborate on a project. Paid feature only."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    collab = conn.execute("SELECT id FROM users WHERE email = ?", (collaborator_email.lower().strip(),)).fetchone()
    if not collab:
        conn.close()
        return {"error": "User not found. They must have a WorkLifeLM account."}
    conn.execute(
        "INSERT INTO collaborators (project_id, owner_id, collaborator_id, role) VALUES (?, ?, ?, ?)",
        (project_id, owner_id, collab["id"], role)
    )
    conn.commit()
    conn.close()
    return {"status": "invited", "collaborator_id": collab["id"], "role": role}


def get_project_collaborators(project_id: str, owner_id: int) -> list:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute("""
        SELECT c.id, c.role, c.accepted, c.invited_at, u.email, u.name
        FROM collaborators c JOIN users u ON c.collaborator_id = u.id
        WHERE c.project_id = ? AND c.owner_id = ?
    """, (project_id, owner_id)).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def remove_collaborator(owner_id: int, collaborator_entry_id: int) -> bool:
    conn = sqlite3.connect(DB_PATH)
    conn.execute("DELETE FROM collaborators WHERE id = ? AND owner_id = ?", (collaborator_entry_id, owner_id))
    conn.commit()
    conn.close()
    return True


# Supported integration providers
SUPPORTED_PROVIDERS = {
    "slack": {"name": "Slack", "auth": "oauth2", "status": "coming_soon"},
    "google_drive": {"name": "Google Drive", "auth": "oauth2", "status": "coming_soon"},
    "gmail": {"name": "Gmail", "auth": "oauth2", "status": "coming_soon"},
    "google_calendar": {"name": "Google Calendar", "auth": "oauth2", "status": "coming_soon"},
    "notion": {"name": "Notion", "auth": "oauth2", "status": "coming_soon"},
    "linear": {"name": "Linear", "auth": "api_key", "status": "coming_soon"},
    "hubspot": {"name": "HubSpot", "auth": "oauth2", "status": "coming_soon"},
    "github": {"name": "GitHub", "auth": "webhook", "status": "active"},
}

# Output file format mapping
OUTPUT_FORMATS = {
    "report": {"ext": "md", "mime": "text/markdown", "label": "Markdown Report"},
    "slides": {"ext": "json", "mime": "application/json", "label": "Slide Deck (JSON)"},
    "mindmap": {"ext": "json", "mime": "application/json", "label": "Mind Map (JSON)"},
    "flashcards": {"ext": "json", "mime": "application/json", "label": "Flashcards (JSON)"},
    "quiz": {"ext": "json", "mime": "application/json", "label": "Quiz (JSON)"},
    "audio_script": {"ext": "txt", "mime": "text/plain", "label": "Audio Script (TXT)"},
    "pitch": {"ext": "md", "mime": "text/markdown", "label": "Pitch (Markdown)"},
    "video": {"ext": "md", "mime": "text/markdown", "label": "Video Storyboard (Markdown)"},
    "crm_followup": {"ext": "md", "mime": "text/markdown", "label": "CRM Follow-up (Markdown)"},
    "workflow": {"ext": "md", "mime": "text/markdown", "label": "Workflow Plan (Markdown)"},
}
