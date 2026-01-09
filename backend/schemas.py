from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# User
class UserBase(BaseModel):
    email: str
    full_name: str

class UserCreate(UserBase):
    password: str

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    course_type: Optional[str] = None
    semester: Optional[str] = None
    study_goal_hours: Optional[float] = None
    avatar: Optional[str] = None

class User(UserBase):
    id: int
    avatar: Optional[str]
    course_type: Optional[str]
    semester: Optional[str]
    study_goal_hours: float
    is_pro: bool
    xp: int
    level: int
    streak: int
    
    class Config:
        orm_mode = True

# Task
class TaskBase(BaseModel):
    text: str
    completed: bool = False

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

# Note
class NoteBase(BaseModel):
    title: str
    body: str

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    created_at: datetime
    owner_id: int

    class Config:
        orm_mode = True

# Subject
class SubjectBase(BaseModel):
    name: str
    progress: float = 0.0
    syllabus: str
    next_class: str

class SubjectCreate(SubjectBase):
    pass

class Subject(SubjectBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

# Groups
class GroupBase(BaseModel):
    name: str
    description: str
    goal: str

class GroupCreate(GroupBase):
    pass

class Group(GroupBase):
    id: int
    created_at: datetime
    
    class Config:
        orm_mode = True

# Messages
class MessageBase(BaseModel):
    content: str

class MessageCreate(MessageBase):
    group_id: int

class Message(MessageBase):
    id: int
    timestamp: datetime
    sender_id: int
    group_id: int
    
    class Config:
        orm_mode = True

# XP Reward request
class XPRewardRequest(BaseModel):
    action_type: str # 'task', 'pomodoro', 'subject'
    reference_id: Optional[int] = None
