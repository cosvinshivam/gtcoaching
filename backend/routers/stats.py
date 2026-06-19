from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models
from sqlalchemy import func
from datetime import datetime
import calendar

router = APIRouter()

@router.get("/")
def get_dashboard_stats(db: Session = Depends(get_db)):
    # Get total content blocks
    content_blocks = db.query(models.SiteContent).count()
    
    # Get payments count
    payments_issued = db.query(models.Purchase).count()
    
    # Get total revenue (only completed)
    revenue_result = db.query(func.sum(models.Purchase.amount)).filter(models.Purchase.status == "completed").scalar()
    total_revenue = float(revenue_result) if revenue_result else 0.0

    # Users count
    total_users = db.query(models.User).count()

    # Generate dynamic chart data for the last 6 months
    monthly_data = []
    today = datetime.utcnow()
    
    # Pre-populate the last 6 months using standard datetime math
    for i in range(5, -1, -1):
        month_num = today.month - i
        year_num = today.year
        while month_num <= 0:
            month_num += 12
            year_num -= 1
            
        month_name = calendar.month_abbr[month_num]
        monthly_data.append({"name": month_name, "revenue": 0.0, "users": 0, "month_num": month_num, "year_num": year_num})

    # Find the start date (1st day of the oldest month in our list)
    oldest_month = monthly_data[0]
    six_months_ago = datetime(oldest_month["year_num"], oldest_month["month_num"], 1)

    recent_purchases = db.query(models.Purchase).filter(models.Purchase.purchased_at >= six_months_ago).all()
    
    # Aggregate data
    for purchase in recent_purchases:
        if purchase.status != "completed":
            continue
            
        p_month = purchase.purchased_at.month
        p_year = purchase.purchased_at.year
        
        # Find the matching month in our pre-populated list
        for m_data in monthly_data:
            if m_data["month_num"] == p_month and m_data["year_num"] == p_year:
                m_data["revenue"] += purchase.amount
                m_data["users"] += 1 # We'll count the number of purchases as user activity
                break

    # Clean up the helper fields
    for m_data in monthly_data:
        del m_data["month_num"]
        del m_data["year_num"]

    return {
        "content_blocks": content_blocks,
        "payments_issued": payments_issued,
        "total_revenue": total_revenue,
        "total_users": total_users,
        "chart_data": monthly_data
    }
