from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Text, DateTime, Table
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

# Association Table for Group Members
group_members = Table(
    "group_members",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("group_id", Integer, ForeignKey("groups.id"))
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    
    # Profile fields
    avatar = Column(String, nullable=True)
    course_type = Column(String, nullable=True)
    semester = Column(String, nullable=True)
    study_goal_hours = Column(Float, default=2.0)
    is_pro = Column(Boolean, default=False)
    
    # Gamification
    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    streak = Column(Integer, default=0)
    last_login = Column(DateTime, default=datetime.utcnow)

    tasks = relationship("Task", back_populates="owner")
    notes = relationship("Note", back_populates="owner")
    subjects = relationship("Subject", back_populates="owner")
    groups = relationship("Group", secondary=group_members, back_populates="members")
    messages = relationship("Message", back_populates="sender")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    completed = Column(Boolean, default=False)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="tasks")

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    body = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="notes")

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    progress = Column(Float, default=0.0)
    syllabus = Column(Text) 
    next_class = Column(String) 
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="subjects")

class Group(Base):
    __tablename__ = "groups"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    goal = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    members = relationship("User", secondary=group_members, back_populates="groups")
    messages = relationship("Message", back_populates="group")

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
    sender_id = Column(Integer, ForeignKey("users.id"))
    group_id = Column(Integer, ForeignKey("groups.id"))
    
    sender = relationship("User", back_populates="messages")
    group = relationship("Group", back_populates="messages")

class FriendRequest(Base):
    __tablename__ = "friend_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    from_user_id = Column(Integer, ForeignKey("users.id"))
    to_user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="pending") # pending, accepted, rejected
    timestamp = Column(DateTime, default=datetime.utcnow)
