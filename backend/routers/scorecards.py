from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
from routers.auth import get_current_user

router = APIRouter()

@router.post("/submit", response_model=schemas.ScorecardResponse)
def submit_scorecard(scorecard_in: schemas.ScorecardCreate, db: Session = Depends(get_db)):
    # Calculate Pillar Scores
    pillar_1 = scorecard_in.q1_score + scorecard_in.q2_score + scorecard_in.q3_score
    pillar_2 = scorecard_in.q4_score + scorecard_in.q5_score + scorecard_in.q6_score
    pillar_3 = scorecard_in.q7_score + scorecard_in.q8_score + scorecard_in.q9_score
    pillar_4 = scorecard_in.q10_score + scorecard_in.q11_score + scorecard_in.q12_score
    pillar_5 = scorecard_in.q13_score + scorecard_in.q14_score + scorecard_in.q15_score
    
    total = pillar_1 + pillar_2 + pillar_3 + pillar_4 + pillar_5
    
    db_scorecard = models.LeadScorecard(
        name=scorecard_in.name,
        email=scorecard_in.email,
        phone=scorecard_in.phone,
        q1_score=scorecard_in.q1_score,
        q2_score=scorecard_in.q2_score,
        q3_score=scorecard_in.q3_score,
        q4_score=scorecard_in.q4_score,
        q5_score=scorecard_in.q5_score,
        q6_score=scorecard_in.q6_score,
        q7_score=scorecard_in.q7_score,
        q8_score=scorecard_in.q8_score,
        q9_score=scorecard_in.q9_score,
        q10_score=scorecard_in.q10_score,
        q11_score=scorecard_in.q11_score,
        q12_score=scorecard_in.q12_score,
        q13_score=scorecard_in.q13_score,
        q14_score=scorecard_in.q14_score,
        q15_score=scorecard_in.q15_score,
        pillar_1_score=pillar_1,
        pillar_2_score=pillar_2,
        pillar_3_score=pillar_3,
        pillar_4_score=pillar_4,
        pillar_5_score=pillar_5,
        total_score=total
    )
    
    db.add(db_scorecard)
    db.commit()
    db.refresh(db_scorecard)
    
    return db_scorecard

@router.get("")
def get_scorecards(
    page: int = 1,
    limit: int = 10,
    current_user: models.User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    offset = (page - 1) * limit
    total = db.query(models.LeadScorecard).count()
    leads = db.query(models.LeadScorecard).order_by(models.LeadScorecard.submitted_at.desc()).offset(offset).limit(limit).all()
    
    return {
        "total": total,
        "page": page,
        "limit": limit,
        "leads": leads
    }
