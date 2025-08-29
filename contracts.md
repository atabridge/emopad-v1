# API Contracts - E-Moped Business Plan Backend Integration

## Overview
This document outlines the backend API contracts needed to replace mock data in the frontend business plan presentation website.

## Current Mock Data Structure
Located in `/app/frontend/src/mock.js`:
- businessPlanData: Static business plan content
- mockImages: Image storage object for uploaded images

## Required Backend APIs

### 1. Business Plan Data API
**Endpoint:** `GET /api/business-plan`
**Purpose:** Retrieve all business plan data structure

**Response:**
```json
{
  "executiveSummary": {
    "projectName": "string",
    "actors": [{"name": "string", "role": "string"}],
    "objective": "string",
    "revenueModel": ["string"]
  },
  "businessModel": {
    "suppliers": [{"name": "string", "product": "string"}]
  },
  "operations": {
    "atabridgeOps": ["string"],
    "ertugOps": ["string"],
    "fiyuuOps": ["string"]
  },
  "products": {
    "equipment": [{"name": "string", "supplier": "string", "imageUploaded": "boolean"}],
    "emoped": {
      "model": "string",
      "specs": [{"label": "string", "value": "string"}],
      "imageUploaded": "boolean"
    },
    "battery": {
      "features": ["string"],
      "imageUploaded": "boolean"
    }
  },
  "financialData": {
    "atabridge": {...},
    "ertug": {...},
    "fiyuuSales": {...},
    "fiyuuSwap": {...}
  },
  "risks": [{"category": "string", "risk": "string"}],
  "investmentSummary": [{"actor": "string", "investment": "string", "model": "string", "result": "string"}]
}
```

### 2. Image Upload API
**Endpoint:** `POST /api/images/upload`
**Purpose:** Handle image uploads for products

**Request:**
- Multipart form data with image file
- Additional fields: type (equipment/emoped/battery), itemId (optional for equipment)

**Response:**
```json
{
  "success": true,
  "imageUrl": "string",
  "imageId": "string"
}
```

### 3. Image Retrieval API
**Endpoint:** `GET /api/images/{imageId}`
**Purpose:** Serve uploaded images

### 4. Image Management API
**Endpoint:** `DELETE /api/images/{imageId}`
**Purpose:** Remove uploaded images

## Database Schema

### BusinessPlan Collection
```javascript
{
  _id: ObjectId,
  content: {
    // Full businessPlanData structure
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Images Collection
```javascript
{
  _id: ObjectId,
  type: String, // "equipment", "emoped", "battery"
  itemId: String, // for equipment items
  filename: String,
  originalName: String,
  mimetype: String,
  size: Number,
  path: String,
  uploadedAt: Date
}
```

## Integration Plan

### Phase 1: Backend Implementation
1. Create MongoDB models for BusinessPlan and Images
2. Implement CRUD endpoints for business plan data
3. Add file upload handling with multer
4. Create image serving endpoints
5. Add basic error handling

### Phase 2: Frontend Integration
1. Replace mock.js imports with API calls
2. Update BusinessPlan.jsx to fetch data from backend
3. Update ImageUploader.jsx to use real upload endpoints
4. Add loading states and error handling
5. Test all functionality

### Phase 3: Data Migration
1. Seed database with initial business plan data from mock.js
2. Test full frontend-backend integration
3. Remove mock.js dependencies

## Frontend Changes Required

### Files to Update:
1. **BusinessPlan.jsx**: Replace `businessPlanData` import with API call
2. **ImageUploader.jsx**: Replace local state with backend upload
3. **mock.js**: Can be removed after integration

### New Files Needed:
1. **services/api.js**: API client functions
2. **hooks/useBusinessPlan.js**: Custom hook for data fetching
3. **utils/imageUtils.js**: Image handling utilities

## Error Handling
- Network errors: Show user-friendly messages
- Upload failures: Allow retry mechanism
- Data loading: Show loading spinners
- API errors: Log and display appropriate messages

## Security Considerations
- File upload validation (type, size limits)
- Image processing and optimization
- Basic rate limiting for uploads
- Input sanitization for text data

## Testing Strategy
- Unit tests for API endpoints
- Integration tests for image upload/retrieval
- Frontend testing for API integration
- Error scenario testing