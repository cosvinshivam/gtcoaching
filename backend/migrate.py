from sqlalchemy import text
from database import engine

def run_migrations():
    with engine.begin() as con:
        queries = [
            "ALTER TABLE users ADD COLUMN email VARCHAR(100) UNIQUE;",
            "ALTER TABLE users ADD COLUMN full_name VARCHAR(100);",
            "ALTER TABLE users ADD COLUMN phone VARCHAR(20);",
            "ALTER TABLE users ADD COLUMN bio TEXT;",
            "ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT 0;",
            "UPDATE users SET is_admin = 1 WHERE username = 'admin';",
            """
            CREATE TABLE IF NOT EXISTS purchases (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                user_id INTEGER,
                plan_name VARCHAR(100),
                amount FLOAT,
                currency VARCHAR(10) DEFAULT 'AED',
                status VARCHAR(50) DEFAULT 'pending',
                purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
            """
        ]
        
        for q in queries:
            try:
                con.execute(text(q))
                print(f"Executed: {q}")
            except Exception as e:
                print(f"Error on {q}: {e}")

if __name__ == "__main__":
    run_migrations()
    print("Migration finished.")
