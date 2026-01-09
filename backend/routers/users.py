from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, models, schemas, auth

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.put("/profile", response_model=schemas.User)
def update_profile(profile: schemas.UserProfileUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if profile.full_name is not None: current_user.full_name = profile.full_name
    if profile.course_type is not None: current_user.course_type = profile.course_type
    if profile.semester is not None: current_user.semester = profile.semester
    if profile.study_goal_hours is not None: current_user.study_goal_hours = profile.study_goal_hours
    if profile.avatar is not None: current_user.avatar = profile.avatar
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/reward-xp", response_model=schemas.User)
def reward_xp(reward: schemas.XPRewardRequest, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    xp_gain = 0
    if reward.action_type == 'task':
        # Verify task is actually completed? For MVP we trust the call if it's task-based
        # But master prompt says "Backend is source of truth"
        if reward.reference_id:
            task = db.query(models.Task).filter(models.Task.id == reward.reference_id, models.Task.owner_id == current_user.id).first()
            if task and task.completed:
                xp_gain = 10
    elif reward.action_type == 'pomodoro':
        # Pomodoro reward is 50 XP
        xp_gain = 50
    elif reward.action_type == 'subject':
        xp_gain = 20
        
    if xp_gain > 0:
        current_user.xp += xp_gain
        current_user.level = (current_user.xp // 100) + 1
        db.commit()
    
    db.refresh(current_user)
    return current_user

@router.post("/upgrade-pro", response_model=schemas.User)
def upgrade_pro(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    current_user.is_pro = True
    db.commit()
    return current_user
