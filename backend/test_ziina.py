import os
import requests
from dotenv import load_dotenv

load_dotenv()

ZIINA_API_KEY = os.getenv("ZIINA_API_KEY")
ZIINA_API_URL = os.getenv("ZIINA_API_URL", "https://api-v2.ziina.com/api")

headers = {
    "Authorization": f"Bearer {ZIINA_API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "amount": 50000,
    "currency_code": "AED",
    "message": "Test Payment",
    "success_url": "http://localhost/success",
    "cancel_url": "http://localhost/cancel",
    "test": True
}

try:
    print(f"URL: {ZIINA_API_URL}/payment_intent")
    print(f"Key prefix: {ZIINA_API_KEY[:10] if ZIINA_API_KEY else 'NONE'}")
    response = requests.post(f"{ZIINA_API_URL}/payment_intent", json=payload, headers=headers)
    print(response.status_code)
    print(response.text)
except Exception as e:
    print("Exception:", e)
