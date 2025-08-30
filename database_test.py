#!/usr/bin/env python3
"""
Database Operations Test for E-Moped Business Plan
Tests MongoDB operations and data persistence
"""

import asyncio
import sys
import os
sys.path.append('/app/backend')

from database import db_manager
from seed_data import SEED_BUSINESS_PLAN

async def test_database_operations():
    """Test database operations"""
    print("🔍 Testing Database Operations")
    print("=" * 50)
    
    try:
        # Test business plan retrieval
        print("📋 Testing business plan retrieval...")
        plan = await db_manager.get_business_plan()
        
        if plan:
            print("✅ Business plan found in database")
            print(f"   - ID: {plan.get('id', 'N/A')}")
            print(f"   - Active: {plan.get('active', 'N/A')}")
            print(f"   - Project Name: {plan.get('content', {}).get('executive_summary', {}).get('project_name', 'N/A')}")
            
            # Check data structure
            content = plan.get('content', {})
            required_sections = [
                'executive_summary', 'business_model', 'operations', 
                'products', 'financial_data', 'risks', 'investment_summary'
            ]
            
            missing_sections = [section for section in required_sections if section not in content]
            if missing_sections:
                print(f"❌ Missing sections in database: {missing_sections}")
            else:
                print("✅ All required sections present in database")
                
        else:
            print("❌ No business plan found in database")
            print("🔄 Attempting to seed database...")
            
            # Try to create business plan
            plan_id = await db_manager.create_business_plan(SEED_BUSINESS_PLAN)
            print(f"✅ Created business plan with ID: {plan_id}")
            
            # Verify creation
            plan = await db_manager.get_business_plan()
            if plan:
                print("✅ Business plan successfully created and retrieved")
            else:
                print("❌ Failed to retrieve created business plan")
        
        # Test image metadata operations
        print("\n🖼️  Testing image metadata operations...")
        
        # Create test image metadata
        test_image_data = {
            "id": "test-image-123",
            "type": "equipment",
            "item_id": "test-equipment-001",
            "filename": "test.jpg",
            "original_name": "test_image.jpg",
            "mimetype": "image/jpeg",
            "size": 1024,
            "path": "/app/backend/uploads/test.jpg",
            "uploaded_at": "2025-08-29T17:00:00Z"
        }
        
        # Save image metadata
        result_id = await db_manager.save_image_metadata(test_image_data)
        print(f"✅ Saved image metadata with result ID: {result_id}")
        
        # Retrieve image metadata
        retrieved_image = await db_manager.get_image_metadata("test-image-123")
        if retrieved_image:
            print("✅ Successfully retrieved image metadata")
            print(f"   - Image ID: {retrieved_image.get('id')}")
            print(f"   - Type: {retrieved_image.get('type')}")
            print(f"   - Filename: {retrieved_image.get('filename')}")
        else:
            print("❌ Failed to retrieve image metadata")
        
        # Test image retrieval by type
        images_by_type = await db_manager.get_images_by_type("equipment")
        print(f"✅ Found {len(images_by_type)} equipment images")
        
        # Clean up test image
        deleted = await db_manager.delete_image_metadata("test-image-123")
        if deleted:
            print("✅ Successfully deleted test image metadata")
        else:
            print("❌ Failed to delete test image metadata")
        
        print("\n🎉 Database operations test completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Database test failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Main test execution"""
    return asyncio.run(test_database_operations())

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)