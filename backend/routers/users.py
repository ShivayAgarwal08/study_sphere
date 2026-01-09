from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, models, schemas, auth
from pydantic import BaseModel

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

class ProfileUpdate(BaseModel):
    full_name: str
    # bio could be added to model if we want, for now let's stick to name

class XPUpdate(BaseModel):
    xp_gain: int

@router.put("/profile", response_model=schemas.User)
def update_profile(profile: ProfileUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    current_user.full_name = profile.full_name
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/add-xp", response_model=schemas.User)
def add_xp(xp_data: XPUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    current_user.xp += xp_data.xp_gain
    
    # Simple level logic: every 100 XP is a level
    current_user.level = (current_user.xp // 100) + 1
    
    db.commit()
    db.refresh(current_user)
    return current_user
