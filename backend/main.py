from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database
from .routers import auth, tasks, subjects

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="StudySphere API")

# CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:8000",
    "null" # For file:// access if needed during dev, though fetch might block it
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for MVP dev simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(subjects.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to StudySphere API"}
