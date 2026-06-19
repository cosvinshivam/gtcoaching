from pydantic import BaseModel
from typing import Optional
import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class UserBase(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None

class UserResponse(UserBase):
    id: int
    is_admin: bool
    class Config:
        from_attributes = True

class PurchaseBase(BaseModel):
    plan_name: str
    amount: float
    currency: str = "AED"

class PurchaseResponse(PurchaseBase):
    id: int
    user_id: int
    status: str
    purchased_at: datetime.datetime
    class Config:
        from_attributes = True

class SiteContentBase(BaseModel):
    section_key: str
    content_value: str

class SiteContentCreate(SiteContentBase):
    pass

class SiteContentResponse(SiteContentBase):
    id: int
    updated_at: datetime.datetime
    class Config:
        from_attributes = True

class PaymentRequest(BaseModel):
    plan_name: str
    amount: float
    currency: str = "AED"
    description: str = "GTCoaching Payment"
    client_name: str
    client_email: str
    client_phone: Optional[str] = None

class ScorecardCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    q1_score: int
    q2_score: int
    q3_score: int
    q4_score: int
    q5_score: int
    q6_score: int
    q7_score: int
    q8_score: int
    q9_score: int
    q10_score: int
    q11_score: int
    q12_score: int
    q13_score: int
    q14_score: int
    q15_score: int

class ScorecardResponse(ScorecardCreate):
    id: int
    pillar_1_score: int
    pillar_2_score: int
    pillar_3_score: int
    pillar_4_score: int
    pillar_5_score: int
    total_score: int
    submitted_at: datetime.datetime
    class Config:
        from_attributes = True
