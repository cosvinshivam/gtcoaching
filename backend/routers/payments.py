from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import requests
import os
import schemas
from routers.auth import get_current_user
from database import get_db
import models
from auth_utils import get_password_hash
import random
import string

router = APIRouter()

ZIINA_API_KEY = os.getenv("ZIINA_API_KEY")
ZIINA_API_URL = os.getenv("ZIINA_API_URL", "https://api-v2.ziina.com/api")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

@router.post("/issue-link")
def issue_payment_link(
    payment_req: schemas.PaymentRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not ZIINA_API_KEY:
        raise HTTPException(status_code=500, detail="Ziina API Key not configured")

    headers = {
        "Authorization": f"Bearer {ZIINA_API_KEY}",
        "Content-Type": "application/json"
    }

    # This is a generic representation of how a payment intent is usually created.
    # The exact payload depends on Ziina's API documentation.
    if payment_req.amount < 2:
        raise HTTPException(status_code=400, detail="Minimum payment amount is 2 AED")

    # Check if client already exists
    client_user = db.query(models.User).filter(models.User.email == payment_req.client_email).first()
    if not client_user:
        # Create new client user
        temp_password = "Welcome123!" # Or generate a random one
        hashed_pwd = get_password_hash(temp_password)
        
        # Generate a username from the email
        base_username = payment_req.client_email.split("@")[0]
        username = base_username
        counter = 1
        while db.query(models.User).filter(models.User.username == username).first():
            username = f"{base_username}{counter}"
            counter += 1
            
        client_user = models.User(
            username=username,
            email=payment_req.client_email,
            full_name=payment_req.client_name,
            phone=payment_req.client_phone,
            hashed_password=hashed_pwd,
            is_admin=False
        )
        db.add(client_user)
        db.commit()
        db.refresh(client_user)

    # Record pending purchase for the client
    new_purchase = models.Purchase(
        user_id=client_user.id,
        plan_name=payment_req.plan_name,
        amount=payment_req.amount,
        currency=payment_req.currency,
        status="Done"
    )
    db.add(new_purchase)
    db.commit()
    db.refresh(new_purchase)

    payload = {
        "amount": int(payment_req.amount * 100), # Amount in fils (100 AED = 10000 fils)
        "currency_code": payment_req.currency,
        "message": payment_req.description,
        "success_url": f"{FRONTEND_URL}/payment/success?purchase_id={new_purchase.id}", # Pass purchase_id
        "cancel_url": f"{FRONTEND_URL}/payment/cancel",
        "test": False # Set to False when deploying to production
    }

    try:
        response = requests.post(f"{ZIINA_API_URL}/payment_intent", json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        # Ziina returns a 'redirect_url' parameter
        return {"payment_url": data.get("redirect_url"), "purchase_id": new_purchase.id}
    except requests.exceptions.RequestException as e:
        error_body = e.response.text if getattr(e, 'response', None) else str(e)
        print("Ziina API Error:", error_body)
        raise HTTPException(status_code=400, detail=f"Error communicating with Ziina: {error_body}")

@router.post("/confirm/{purchase_id}")
def confirm_purchase(
    purchase_id: int, 
    current_user: models.User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    # Security: Verify that this purchase belongs to current_user
    purchase = db.query(models.Purchase).filter(models.Purchase.id == purchase_id, models.Purchase.user_id == current_user.id).first()
    if not purchase:
        raise HTTPException(status_code=404, detail="Purchase not found")
        
    # Mark as completed
    purchase.status = "completed"
    db.commit()
    db.refresh(purchase)
    return {"message": "Purchase confirmed", "purchase_id": purchase.id}

@router.get("/my-purchases", response_model=list[schemas.PurchaseResponse])
def get_my_purchases(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    purchases = db.query(models.Purchase).filter(models.Purchase.user_id == current_user.id, models.Purchase.status == "completed").order_by(models.Purchase.purchased_at.desc()).all()
    return purchases
