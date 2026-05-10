import sqlite3
import os
import sys

def migrate_local_to_production():
    """
    Script to initialize and migrate local mock data to the production-grade SQLite 
    (or prepare schema for PostgreSQL migration).
    """
    print("🚀 Initializing Production Database Migration...")
    
    db_path = os.environ.get("DATABASE_URL", "worklifelm_prod.db")
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # 1. Auth Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE,
                password_hash TEXT,
                tier TEXT DEFAULT 'free',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # 2. Marketplace Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS marketplace_packs (
                id TEXT PRIMARY KEY,
                title TEXT,
                description TEXT,
                dialect TEXT,
                contributor_id TEXT,
                price REAL,
                verified BOOLEAN,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # 3. Governance Risk Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS governance_risks (
                id TEXT PRIMARY KEY,
                category TEXT,
                description TEXT,
                severity TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        print(f"✅ Migration successful. Production schema established in {db_path}")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        sys.exit(1)
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    migrate_local_to_production()
