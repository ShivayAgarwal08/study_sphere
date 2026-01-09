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

class User(UserBase):
    id: int
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
    syllabus: str # JSON or CSV
    next_class: str

class SubjectCreate(SubjectBase):
    pass

class Subject(SubjectBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
