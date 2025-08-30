from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

class DatabaseManager:
    def __init__(self):
        self.business_plans = db.business_plans
        self.images = db.images

    async def get_business_plan(self) -> Optional[dict]:
        """Get the current business plan data"""
        plan = await self.business_plans.find_one({"active": True})
        return plan

    async def create_business_plan(self, plan_data: dict) -> str:
        """Create or update the business plan"""
        # Deactivate existing plans
        await self.business_plans.update_many({}, {"$set": {"active": False}})
        
        # Create new active plan
        plan_data["active"] = True
        result = await self.business_plans.insert_one(plan_data)
        return str(result.inserted_id)

    async def update_business_plan(self, plan_id: str, plan_data: dict) -> bool:
        """Update an existing business plan"""
        plan_data["updated_at"] = plan_data.get("updatedAt")
        result = await self.business_plans.update_one(
            {"id": plan_id}, 
            {"$set": plan_data}
        )
        return result.modified_count > 0

    async def save_image_metadata(self, image_data: dict) -> str:
        """Save image metadata to database"""
        result = await self.images.insert_one(image_data)
        return str(result.inserted_id)

    async def get_image_metadata(self, image_id: str) -> Optional[dict]:
        """Get image metadata by ID"""
        image = await self.images.find_one({"id": image_id})
        return image

    async def delete_image_metadata(self, image_id: str) -> bool:
        """Delete image metadata"""
        result = await self.images.delete_one({"id": image_id})
        return result.deleted_count > 0

    async def get_images_by_type(self, image_type: str, item_id: Optional[str] = None) -> list:
        """Get images by type and optionally by item_id"""
        query = {"type": image_type}
        if item_id:
            query["item_id"] = item_id
        
        cursor = self.images.find(query)
        images = await cursor.to_list(length=None)
        return images

# Global database manager instance
db_manager = DatabaseManager()