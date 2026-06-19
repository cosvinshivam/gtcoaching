from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True, nullable=True)
    hashed_password = Column(String(255))
    full_name = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    bio = Column(Text, nullable=True)
    is_admin = Column(Boolean, default=False)

class Purchase(Base):
    __tablename__ = "purchases"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_name = Column(String(100))
    amount = Column(Float)
    currency = Column(String(10), default="AED")
    status = Column(String(50), default="pending") # pending, completed
    purchased_at = Column(DateTime, default=datetime.datetime.utcnow)

class SiteContent(Base):
    __tablename__ = "site_content"
    id = Column(Integer, primary_key=True, index=True)
    section_key = Column(String(100), unique=True, index=True)
    content_value = Column(Text)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class LeadScorecard(Base):
    __tablename__ = "lead_scorecards"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))
    phone = Column(String(20), nullable=True)
    
    # Pillar 1
    q1_score = Column(Integer)
    q2_score = Column(Integer)
    q3_score = Column(Integer)
    pillar_1_score = Column(Integer)
    
    # Pillar 2
    q4_score = Column(Integer)
    q5_score = Column(Integer)
    q6_score = Column(Integer)
    pillar_2_score = Column(Integer)
    
    # Pillar 3
    q7_score = Column(Integer)
    q8_score = Column(Integer)
    q9_score = Column(Integer)
    pillar_3_score = Column(Integer)
    
    # Pillar 4
    q10_score = Column(Integer)
    q11_score = Column(Integer)
    q12_score = Column(Integer)
    pillar_4_score = Column(Integer)
    
    # Pillar 5
    q13_score = Column(Integer)
    q14_score = Column(Integer)
    q15_score = Column(Integer)
    pillar_5_score = Column(Integer)
    
    total_score = Column(Integer)
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)
