from fastapi import FastAPI, APIRouter, HTTPException, File, UploadFile, Form
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import Optional
import aiofiles
import shutil
from datetime import datetime

from models import BusinessPlanResponse, ImageUploadResponse, ErrorResponse
from database import db_manager
from seed_data import SEED_BUSINESS_PLAN

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create uploads directory
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# Create the main app without a prefix
app = FastAPI(title="E-Moped Business Plan API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize database with seed data
@app.on_event("startup")
async def startup_event():
    # Check if business plan exists, if not create it
    existing_plan = await db_manager.get_business_plan()
    if not existing_plan:
        await db_manager.create_business_plan(SEED_BUSINESS_PLAN)
        logging.info("Seeded database with initial business plan data")

@api_router.get("/")
async def root():
    return {"message": "E-Moped Business Plan API"}

@api_router.get("/business-plan", response_model=BusinessPlanResponse)
async def get_business_plan():
    """Get the current business plan data"""
    try:
        plan = await db_manager.get_business_plan()
        if not plan:
            raise HTTPException(status_code=404, detail="Business plan not found")
        
        return BusinessPlanResponse(success=True, data=plan["content"])
    except Exception as e:
        logging.error(f"Error fetching business plan: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


