from fastapi import APIRouter, Depends, HTTPException
import requests
import os
import schemas
from routers.auth import get_current_user
import models

router = APIRouter()

ZIINA_API_KEY = os.getenv("ZIINA_API_KEY")
ZIINA_API_URL = os.getenv("ZIINA_API_URL", "https://api.ziina.com/v1")

@router.post("/issue-link")
def issue_payment_link(
    payment_req: schemas.PaymentRequest,
    current_user: models.User = Depends(get_current_user)
):
    if not ZIINA_API_KEY:
        raise HTTPException(status_code=500, detail="Ziina API Key not configured")

    headers = {
        "Authorization": f"Bearer {ZIINA_API_KEY}",
        "Content-Type": "application/json"
    }

    # This is a generic representation of how a payment intent is usually created.
    # The exact payload depends on Ziina's API documentation.
    payload = {
        "amount": int(payment_req.amount * 100), # Usually in cents/fils
        "currency_code": payment_req.currency,
        "message": payment_req.description
    }

    try:
        response = requests.post(f"{ZIINA_API_URL}/payment_intent", json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        # Assume Ziina returns a redirect_url or something similar
        return {"payment_url": data.get("redirect_url", "https://ziina.com/fallback"), "id": data.get("id")}
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Error communicating with Ziina: {str(e)}")
