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
import uuid

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

@api_router.post("/images/upload", response_model=ImageUploadResponse)
async def upload_image(
    file: UploadFile = File(...),
    image_type: str = Form(...),  # "equipment", "emoped", "battery"
    item_id: Optional[str] = Form(None)  # for equipment items
):
    """Upload an image for products"""
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Generate unique filename
        file_id = str(uuid.uuid4())
        file_extension = Path(file.filename).suffix
        filename = f"{file_id}{file_extension}"
        file_path = UPLOAD_DIR / filename
        
        # Save file
        async with aiofiles.open(file_path, 'wb') as f:
            content = await file.read()
            await f.write(content)
        
        # Save metadata to database
        image_data = {
            "id": file_id,
            "type": image_type,
            "item_id": item_id,
            "filename": filename,
            "original_name": file.filename,
            "mimetype": file.content_type,
            "size": len(content),
            "path": str(file_path),
            "uploaded_at": datetime.utcnow()
        }
        
        await db_manager.save_image_metadata(image_data)
        
        return ImageUploadResponse(
            success=True,
            image_url=f"/api/images/{file_id}",
            image_id=file_id
        )
        
    except Exception as e:
        logging.error(f"Error uploading image: {e}")
        raise HTTPException(status_code=500, detail="Failed to upload image")

@api_router.get("/images/{image_id}")
async def get_image(image_id: str):
    """Serve an uploaded image"""
    try:
        image_metadata = await db_manager.get_image_metadata(image_id)
        if not image_metadata:
            raise HTTPException(status_code=404, detail="Image not found")
        
        file_path = Path(image_metadata["path"])
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="Image file not found")
        
        return FileResponse(
            file_path,
            media_type=image_metadata["mimetype"],
            filename=image_metadata["original_name"]
        )
        
    except Exception as e:
        logging.error(f"Error serving image: {e}")
        raise HTTPException(status_code=500, detail="Failed to serve image")

@api_router.delete("/images/{image_id}")
async def delete_image(image_id: str):
    """Delete an uploaded image"""
    try:
        image_metadata = await db_manager.get_image_metadata(image_id)
        if not image_metadata:
            raise HTTPException(status_code=404, detail="Image not found")
        
        # Delete file from disk
        file_path = Path(image_metadata["path"])
        if file_path.exists():
            file_path.unlink()
        
        # Delete metadata from database
        await db_manager.delete_image_metadata(image_id)
        
        return {"success": True, "message": "Image deleted successfully"}
        
    except Exception as e:
        logging.error(f"Error deleting image: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete image")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)