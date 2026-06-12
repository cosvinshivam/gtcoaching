from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import get_db
from routers.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[schemas.SiteContentResponse])
def get_all_content(db: Session = Depends(get_db)):
    return db.query(models.SiteContent).all()

@router.get("/{section_key}", response_model=schemas.SiteContentResponse)
def get_content_by_key(section_key: str, db: Session = Depends(get_db)):
    content = db.query(models.SiteContent).filter(models.SiteContent.section_key == section_key).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return content

@router.post("/", response_model=schemas.SiteContentResponse)
def create_or_update_content(
    content_in: schemas.SiteContentCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    content = db.query(models.SiteContent).filter(models.SiteContent.section_key == content_in.section_key).first()
    if content:
        content.content_value = content_in.content_value
    else:
        content = models.SiteContent(section_key=content_in.section_key, content_value=content_in.content_value)
        db.add(content)
    db.commit()
    db.refresh(content)
    return content

@router.delete("/{section_key}")
def delete_content(
    section_key: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    content = db.query(models.SiteContent).filter(models.SiteContent.section_key == section_key).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    db.delete(content)
    db.commit()
    return {"message": "Content deleted successfully"}
