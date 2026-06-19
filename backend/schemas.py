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
