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

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
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
    amount: float
    currency: str = "AED"
    description: str = "GTCoaching Payment"
