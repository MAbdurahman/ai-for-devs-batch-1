"""Utility: create a user for testing.
Usage: python create_user.py
Set DATABASE_URL and SECRET_KEY in env if needed.
"""
import os
from database import SessionLocal, engine
import crud, auth, models

models.Base.metadata.create_all(bind=engine)

def main():
    db = SessionLocal()
    try:
        email = os.getenv('TEST_USER_EMAIL', 'alice@example.com')
        password = os.getenv('TEST_USER_PASSWORD', 's3cret!')
        existing = crud.get_user_by_email(db, email)
        if existing:
            print('User exists:', existing.email)
            return
        hashed = auth.get_password_hash(password)
        user = crud.create_user(db, email, hashed)
        print('Created user:', user.email)
    finally:
        db.close()

if __name__ == '__main__':
    main()
