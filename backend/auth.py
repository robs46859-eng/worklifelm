"""
WorkLifeLM Auth & Billing Module
Handles user registration, login, JWT sessions, tier management,
rate limiting, and Stripe checkout integration.
"""
import sqlite3
import os
import jwt
import bcrypt
import time
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Request, HTTPException

JWT_SECRET = os.environ.get("JWT_SECRET", "worklifelm-secret-key-change-in-production-2026")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 72

DB_PATH = os.environ.get("AUTH_DB_PATH", "./data/auth.db")

# ----- Database Setup -----
def init_auth_db():
    """Initialize the SQLite auth database with required tables."""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT DEFAULT '',
            tier TEXT DEFAULT 'free',
            stripe_customer_id TEXT,
            stripe_subscription_id TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS usage_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            action TEXT NOT NULL,
            count INTEGER DEFAULT 1,
            date TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    conn.commit()

    # Seed admin account if not exists
    existing = conn.execute("SELECT id FROM users WHERE email = ?", ("robcofamily@gmail.com",)).fetchone()
    if not existing:
        pw_hash = bcrypt.hashpw(b"ArkhamAdmin2026!", bcrypt.gensalt()).decode()
        conn.execute(
            "INSERT INTO users (email, password_hash, name, tier) VALUES (?, ?, ?, ?)",
            ("robcofamily@gmail.com", pw_hash, "Rob (Admin)", "admin")
        )
        conn.commit()

    conn.close()


# ----- User CRUD -----
def create_user(email: str, password: str, name: str = "") -> dict:
    """Register a new user."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        conn.execute(
            "INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)",
            (email.lower().strip(), pw_hash, name)
        )
        conn.commit()
        user = conn.execute("SELECT * FROM users WHERE email = ?", (email.lower().strip(),)).fetchone()
        return dict(user)
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=409, detail="Email already registered")
    finally:
        conn.close()


def authenticate_user(email: str, password: str) -> Optional[dict]:
    """Verify credentials and return user dict or None."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    user = conn.execute("SELECT * FROM users WHERE email = ?", (email.lower().strip(),)).fetchone()
    conn.close()
    if not user:
        return None
    if bcrypt.checkpw(password.encode(), user["password_hash"].encode()):
        return dict(user)
    return None


def get_user_by_id(user_id: int) -> Optional[dict]:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    return dict(user) if user else None


def update_user_tier(user_id: int, tier: str, stripe_customer_id: str = None, stripe_subscription_id: str = None):
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "UPDATE users SET tier = ?, stripe_customer_id = ?, stripe_subscription_id = ?, updated_at = ? WHERE id = ?",
        (tier, stripe_customer_id, stripe_subscription_id, datetime.utcnow().isoformat(), user_id)
    )
    conn.commit()
    conn.close()


# ----- JWT Tokens -----
def create_token(user: dict) -> str:
    payload = {
        "sub": user["id"],
        "email": user["email"],
        "tier": user["tier"],
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRY_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> Optional[dict]:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user(request: Request) -> Optional[dict]:
    """Extract user from Authorization header. Returns None for anonymous."""
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return None
    token_data = decode_token(auth[7:])
    user = get_user_by_id(token_data["sub"])
    return user


# ----- Rate Limiting -----
TIER_LIMITS = {
    "free": {
        "chats": 50, "reports": 10, "flashcards": 10, "quizzes": 10,
        "audio": 3, "video": 3, "mindmaps": 10, "slides": 5, "pitch": 3,
    },
    "professional": {
        "chats": 200, "reports": 20, "flashcards": 20, "quizzes": 20,
        "audio": 6, "video": 6, "mindmaps": 20, "slides": 15, "pitch": 10,
    },
    "max": {
        "chats": 500, "reports": 100, "flashcards": 100, "quizzes": 100,
        "audio": 20, "video": 20, "mindmaps": 100, "slides": 50, "pitch": 50,
    },
    "admin": {
        "chats": 999999, "reports": 999999, "flashcards": 999999, "quizzes": 999999,
        "audio": 999999, "video": 999999, "mindmaps": 999999, "slides": 999999, "pitch": 999999,
    },
}


def check_rate_limit(user_id: int, action: str, tier: str) -> dict:
    """Check if the user has exceeded their daily limit for this action."""
    today = datetime.utcnow().strftime("%Y-%m-%d")
    limits = TIER_LIMITS.get(tier, TIER_LIMITS["free"])
    max_allowed = limits.get(action, 10)

    conn = sqlite3.connect(DB_PATH)
    row = conn.execute(
        "SELECT COALESCE(SUM(count), 0) as total FROM usage_log WHERE user_id = ? AND action = ? AND date = ?",
        (user_id, action, today)
    ).fetchone()
    used = row[0] if row else 0
    conn.close()

    return {
        "allowed": used < max_allowed,
        "used": used,
        "limit": max_allowed,
        "remaining": max(0, max_allowed - used),
    }


def record_usage(user_id: int, action: str):
    """Record a single usage event."""
    today = datetime.utcnow().strftime("%Y-%m-%d")
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "INSERT INTO usage_log (user_id, action, date) VALUES (?, ?, ?)",
        (user_id, action, today)
    )
    conn.commit()
    conn.close()


def get_usage_summary(user_id: int, tier: str) -> dict:
    """Get today's usage summary for a user."""
    today = datetime.utcnow().strftime("%Y-%m-%d")
    limits = TIER_LIMITS.get(tier, TIER_LIMITS["free"])

    conn = sqlite3.connect(DB_PATH)
    rows = conn.execute(
        "SELECT action, SUM(count) as total FROM usage_log WHERE user_id = ? AND date = ? GROUP BY action",
        (user_id, today)
    ).fetchall()
    conn.close()

    usage = {action: 0 for action in limits}
    for row in rows:
        usage[row[0]] = row[1]

    return {
        action: {"used": usage.get(action, 0), "limit": limit, "remaining": max(0, limit - usage.get(action, 0))}
        for action, limit in limits.items()
    }
