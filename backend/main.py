from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
import models
from routers import auth, content, images, payments, stats
from auth_utils import get_password_hash

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="GTCoaching API")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Seed initial admin user if not exists
def seed_admin():
    db = SessionLocal()
    try:
        admin = db.query(models.User).filter(models.User.username == "admin").first()
        if not admin:
            hashed_pwd = get_password_hash("adminpassword")
            new_admin = models.User(username="admin", hashed_password=hashed_pwd)
            db.add(new_admin)
            db.commit()
            print("Seed admin created: username=admin, password=adminpassword")
    finally:
        db.close()

seed_admin()

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(content.router, prefix="/api/content", tags=["content"])
app.include_router(images.router, prefix="/api/images", tags=["images"])
app.include_router(payments.router, prefix="/api/payments", tags=["payments"])
app.include_router(stats.router, prefix="/api/stats", tags=["stats"])

@app.get("/")
def read_root():
    return {"message": "Welcome to GTCoaching API"}

from sqlalchemy import text
@app.get("/migrate")
def run_migrations():
    from database import engine
    with engine.begin() as con:
        queries = [
            "ALTER TABLE users ADD COLUMN email VARCHAR(100) UNIQUE;",
            "ALTER TABLE users ADD COLUMN full_name VARCHAR(100);",
            "ALTER TABLE users ADD COLUMN phone VARCHAR(20);",
            "ALTER TABLE users ADD COLUMN bio TEXT;",
            "ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT 0;",
            "UPDATE users SET is_admin = 1 WHERE username = 'admin';"
        ]
        results = []
        for q in queries:
            try:
                con.execute(text(q))
                results.append(f"Executed: {q}")
            except Exception as e:
                results.append(f"Error on {q}: {e}")
        return {"results": results}
