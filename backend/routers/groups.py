from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import database, models, schemas, auth

router = APIRouter(
    prefix="/groups",
    tags=["groups"],
)

@router.get("/", response_model=List[schemas.Group])
def get_groups(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return current_user.groups

@router.post("/", response_model=schemas.Group)
def create_group(group: schemas.GroupCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_group = models.Group(**group.dict())
    db_group.members.append(current_user)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

@router.post("/{group_id}/join")
def join_group(group_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    group = db.query(models.Group).filter(models.Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    if current_user in group.members:
        return {"message": "Already a member"}
    group.members.append(current_user)
    db.commit()
    return {"message": "Joined successfully"}

@router.get("/{group_id}/messages", response_model=List[schemas.Message])
def get_messages(group_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    group = db.query(models.Group).filter(models.Group.id == group_id).first()
    if not group or current_user not in group.members:
        raise HTTPException(status_code=403, detail="Not a member of this group")
    return db.query(models.Message).filter(models.Message.group_id == group_id).order_by(models.Message.timestamp.asc()).all()

@router.post("/{group_id}/messages", response_model=schemas.Message)
def send_message(group_id: int, message: schemas.MessageBase, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    group = db.query(models.Group).filter(models.Group.id == group_id).first()
    if not group or current_user not in group.members:
        raise HTTPException(status_code=403, detail="Not a member of this group")
    
    db_message = models.Message(content=message.content, sender_id=current_user.id, group_id=group_id)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
