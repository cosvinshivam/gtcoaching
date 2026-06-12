from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
import models
from routers import auth, content, images, payments
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

@app.get("/")
def read_root():
    return {"message": "Welcome to GTCoaching API"}
