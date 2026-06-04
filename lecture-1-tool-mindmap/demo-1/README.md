FastAPI login endpoint with SQLAlchemy and Alembic migration instructions.

Setup:
1. python -m venv .venv
2. .venv\Scripts\activate
3. pip install -r requirements.txt
4. (optional) set env vars: DATABASE_URL, SECRET_KEY

Run locally:
- python create_user.py  # creates a test user
- uvicorn main:app --reload

Migrations (Alembic):
1. alembic init alembic
2. Edit alembic/env.py to import models and set target_metadata = models.Base.metadata
3. alembic revision --autogenerate -m "create users"
4. alembic upgrade head

This project uses models.Base.metadata.create_all for a quick start; use Alembic for production migrations.
