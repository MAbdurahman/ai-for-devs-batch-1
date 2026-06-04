from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import os

import models
import schemas
import crud
import auth
from database import SessionLocal, engine

# Create tables if they don't exist (simple migrations). Use Alembic for production migrations.
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/login", response_model=schemas.TokenResponse)
def login(req: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, req.email)
    if not user or not auth.verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_access_token({"sub": user.id, "email": user.email})
    return {"access_token": token, "token_type": "bearer"}
