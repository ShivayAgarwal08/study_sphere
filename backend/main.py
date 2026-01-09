from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database
from .routers import auth, tasks, subjects, notes, users, groups

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="StudySphere API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(subjects.router)
app.include_router(notes.router)
app.include_router(users.router)
app.include_router(groups.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to StudySphere API"}
