import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Business Plan API
export const businessPlanAPI = {
  // Get business plan data
  getBusinessPlan: async () => {
    try {
      const response = await apiClient.get('/business-plan');
      return response.data;
    } catch (error) {
      console.error('Error fetching business plan:', error);
      throw error;
    }
  },
};

// Images API
export const imagesAPI = {
  // Upload an image
  uploadImage: async (file, type, itemId = null) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('image_type', type);
      if (itemId) {
        formData.append('item_id', itemId);
      }

      const response = await apiClient.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Get image URL
  getImageUrl: (imageId) => {
    return `${API}/images/${imageId}`;
  },

  // Delete an image
  deleteImage: async (imageId) => {
    try {
      const response = await apiClient.delete(`/images/${imageId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },
};

// Error handling helper
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.detail || 'An error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response received
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
    };
  }
};