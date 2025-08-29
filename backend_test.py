#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for E-Moped Business Plan
Tests all backend endpoints and database operations
"""

import requests
import json
import os
import tempfile
from pathlib import Path
import time
from typing import Dict, Any

# Get backend URL from frontend .env file
def get_backend_url():
    frontend_env_path = Path("/app/frontend/.env")
    if frontend_env_path.exists():
        with open(frontend_env_path, 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_BASE = f"{BASE_URL}/api"

class BackendTester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        self.uploaded_image_ids = []
        
    def log_test(self, test_name: str, success: bool, message: str, details: Dict[Any, Any] = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/")
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_test("API Root", True, f"API accessible, message: {data['message']}")
                    return True
                else:
                    self.log_test("API Root", False, "Response missing message field", {"response": data})
                    return False
            else:
                self.log_test("API Root", False, f"HTTP {response.status_code}", {"response": response.text})
                return False
        except Exception as e:
            self.log_test("API Root", False, f"Connection error: {str(e)}")
            return False
    
    def test_business_plan_api(self):
        """Test business plan data retrieval"""
        try:
            response = self.session.get(f"{API_BASE}/business-plan")
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if not data.get("success"):
                    self.log_test("Business Plan API - Structure", False, "Response success field is false", {"response": data})
                    return False
                
                if "data" not in data:
                    self.log_test("Business Plan API - Structure", False, "Missing data field", {"response": data})
                    return False
                
                business_data = data["data"]
                
                # Check required sections
                required_sections = [
                    "executive_summary", "business_model", "operations", 
                    "products", "financial_data", "risks", "investment_summary"
                ]
                
                missing_sections = []
                for section in required_sections:
                    if section not in business_data:
                        missing_sections.append(section)
                
                if missing_sections:
                    self.log_test("Business Plan API - Data Structure", False, 
                                f"Missing sections: {missing_sections}", {"response": business_data})
                    return False
                
                # Check executive summary structure
                exec_summary = business_data.get("executive_summary", {})
                if not exec_summary.get("project_name"):
                    self.log_test("Business Plan API - Executive Summary", False, 
                                "Missing project_name in executive_summary")
                    return False
                
                # Check products structure
                products = business_data.get("products", {})
                if "equipment" not in products or "emoped" not in products or "battery" not in products:
                    self.log_test("Business Plan API - Products", False, 
                                "Missing equipment, emoped, or battery in products")
                    return False
                
                # Check financial data structure
                financial_data = business_data.get("financial_data", {})
                if not all(key in financial_data for key in ["atabridge", "ertug", "fiyuu_sales", "fiyuu_swap"]):
                    self.log_test("Business Plan API - Financial Data", False, 
                                "Missing financial data sections")
                    return False
                
                self.log_test("Business Plan API", True, 
                            f"Successfully retrieved business plan with all sections")
                return True
                
            else:
                self.log_test("Business Plan API", False, 
                            f"HTTP {response.status_code}", {"response": response.text})
                return False
                
        except Exception as e:
            self.log_test("Business Plan API", False, f"Request error: {str(e)}")
            return False
    
    def create_test_image(self, filename: str = "test_image.jpg", size_kb: int = 50):
        """Create a test image file"""
        # Create a simple test image (JPEG header + minimal data)
        jpeg_header = bytes([
            0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
            0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43
        ])
        
        # Pad to desired size
        padding_size = (size_kb * 1024) - len(jpeg_header) - 2  # -2 for JPEG end marker
        padding = b'\x00' * max(0, padding_size)
        jpeg_end = bytes([0xFF, 0xD9])
        
        image_data = jpeg_header + padding + jpeg_end
        
        # Write to temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
        temp_file.write(image_data)
        temp_file.close()
        
        return temp_file.name
    
    def test_image_upload_api(self):
        """Test image upload functionality"""
        try:
            # Test valid image upload
            test_image_path = self.create_test_image("test_equipment.jpg", 100)
            
            with open(test_image_path, 'rb') as f:
                files = {'file': ('test_equipment.jpg', f, 'image/jpeg')}
                data = {'image_type': 'equipment', 'item_id': 'test-equipment-001'}
                
                response = self.session.post(f"{API_BASE}/images/upload", files=files, data=data)
            
            # Clean up test file
            os.unlink(test_image_path)
            
            if response.status_code == 200:
                upload_data = response.json()
                
                if not upload_data.get("success"):
                    self.log_test("Image Upload API - Valid Upload", False, 
                                "Upload success field is false", {"response": upload_data})
                    return False
                
                if "image_url" not in upload_data or "image_id" not in upload_data:
                    self.log_test("Image Upload API - Valid Upload", False, 
                                "Missing image_url or image_id", {"response": upload_data})
                    return False
                
                # Store image ID for later tests
                image_id = upload_data["image_id"]
                self.uploaded_image_ids.append(image_id)
                
                self.log_test("Image Upload API - Valid Upload", True, 
                            f"Successfully uploaded image with ID: {image_id}")
                
                # Test invalid file type
                try:
                    text_file = tempfile.NamedTemporaryFile(delete=False, suffix='.txt')
                    text_file.write(b"This is not an image")
                    text_file.close()
                    
                    with open(text_file.name, 'rb') as f:
                        files = {'file': ('test.txt', f, 'text/plain')}
                        data = {'image_type': 'equipment'}
                        
                        response = self.session.post(f"{API_BASE}/images/upload", files=files, data=data)
                    
                    os.unlink(text_file.name)
                    
                    if response.status_code == 400:
                        self.log_test("Image Upload API - Invalid File Type", True, 
                                    "Correctly rejected non-image file")
                    else:
                        self.log_test("Image Upload API - Invalid File Type", False, 
                                    f"Should reject non-image files, got HTTP {response.status_code}")
                        
                except Exception as e:
                    self.log_test("Image Upload API - Invalid File Type", False, 
                                f"Error testing invalid file: {str(e)}")
                
                return True
                
            else:
                self.log_test("Image Upload API - Valid Upload", False, 
                            f"HTTP {response.status_code}", {"response": response.text})
                return False
                
        except Exception as e:
            self.log_test("Image Upload API", False, f"Request error: {str(e)}")
            return False
    
    def test_image_retrieval_api(self):
        """Test image retrieval functionality"""
        if not self.uploaded_image_ids:
            self.log_test("Image Retrieval API", False, "No uploaded images to test retrieval")
            return False
        
        try:
            # Test valid image retrieval
            image_id = self.uploaded_image_ids[0]
            response = self.session.get(f"{API_BASE}/images/{image_id}")
            
            if response.status_code == 200:
                # Check if response is an image
                content_type = response.headers.get('content-type', '')
                if content_type.startswith('image/'):
                    self.log_test("Image Retrieval API - Valid ID", True, 
                                f"Successfully retrieved image, content-type: {content_type}")
                else:
                    self.log_test("Image Retrieval API - Valid ID", False, 
                                f"Response not an image, content-type: {content_type}")
                    return False
            else:
                self.log_test("Image Retrieval API - Valid ID", False, 
                            f"HTTP {response.status_code}", {"response": response.text})
                return False
            
            # Test invalid image ID
            response = self.session.get(f"{API_BASE}/images/nonexistent-image-id")
            
            if response.status_code == 404:
                self.log_test("Image Retrieval API - Invalid ID", True, 
                            "Correctly returned 404 for nonexistent image")
            else:
                self.log_test("Image Retrieval API - Invalid ID", False, 
                            f"Should return 404 for nonexistent image, got HTTP {response.status_code}")
            
            return True
            
        except Exception as e:
            self.log_test("Image Retrieval API", False, f"Request error: {str(e)}")
            return False
    
    def test_image_delete_api(self):
        """Test image deletion functionality"""
        if not self.uploaded_image_ids:
            self.log_test("Image Delete API", False, "No uploaded images to test deletion")
            return False
        
        try:
            # Test valid image deletion
            image_id = self.uploaded_image_ids[0]
            response = self.session.delete(f"{API_BASE}/images/{image_id}")
            
            if response.status_code == 200:
                delete_data = response.json()
                if delete_data.get("success"):
                    self.log_test("Image Delete API - Valid ID", True, 
                                f"Successfully deleted image {image_id}")
                    
                    # Verify image is actually deleted
                    verify_response = self.session.get(f"{API_BASE}/images/{image_id}")
                    if verify_response.status_code == 404:
                        self.log_test("Image Delete API - Verification", True, 
                                    "Deleted image no longer accessible")
                    else:
                        self.log_test("Image Delete API - Verification", False, 
                                    "Deleted image still accessible")
                else:
                    self.log_test("Image Delete API - Valid ID", False, 
                                "Delete success field is false", {"response": delete_data})
                    return False
            else:
                self.log_test("Image Delete API - Valid ID", False, 
                            f"HTTP {response.status_code}", {"response": response.text})
                return False
            
            # Test invalid image ID deletion
            response = self.session.delete(f"{API_BASE}/images/nonexistent-image-id")
            
            if response.status_code == 404:
                self.log_test("Image Delete API - Invalid ID", True, 
                            "Correctly returned 404 for nonexistent image deletion")
            else:
                self.log_test("Image Delete API - Invalid ID", False, 
                            f"Should return 404 for nonexistent image deletion, got HTTP {response.status_code}")
            
            return True
            
        except Exception as e:
            self.log_test("Image Delete API", False, f"Request error: {str(e)}")
            return False
    
    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            # Make an OPTIONS request to check CORS headers
            response = self.session.options(f"{API_BASE}/business-plan")
            
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
            }
            
            if cors_headers['Access-Control-Allow-Origin']:
                self.log_test("CORS Configuration", True, 
                            f"CORS headers present: {cors_headers}")
                return True
            else:
                self.log_test("CORS Configuration", False, 
                            "Missing CORS headers", {"headers": dict(response.headers)})
                return False
                
        except Exception as e:
            self.log_test("CORS Configuration", False, f"Request error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests")
        print(f"📍 Base URL: {BASE_URL}")
        print(f"📍 API Base: {API_BASE}")
        print("=" * 60)
        
        # Test API connectivity first
        if not self.test_api_root():
            print("❌ Cannot connect to API, stopping tests")
            return False
        
        # Run all tests
        tests = [
            self.test_business_plan_api,
            self.test_image_upload_api,
            self.test_image_retrieval_api,
            self.test_image_delete_api,
            self.test_cors_headers
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            if test():
                passed += 1
        
        print("=" * 60)
        print(f"📊 Test Results: {passed}/{total} tests passed")
        
        # Print summary
        print("\n📋 Test Summary:")
        for result in self.test_results:
            status = "✅" if result["success"] else "❌"
            print(f"{status} {result['test']}: {result['message']}")
        
        return passed == total

def main():
    """Main test execution"""
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All backend tests passed!")
        return 0
    else:
        print("\n⚠️  Some backend tests failed!")
        return 1

if __name__ == "__main__":
    exit(main())