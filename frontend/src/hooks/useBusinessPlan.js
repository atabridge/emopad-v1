import { useState, useEffect } from 'react';
import { businessPlanAPI } from '../services/api';

export const useBusinessPlan = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBusinessPlan = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await businessPlanAPI.getBusinessPlan();
      if (response.success) {
        setData(response.data);
      } else {
        setError('Failed to fetch business plan data');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
      console.error('Error in useBusinessPlan:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessPlan();
  }, []);

  const refetch = () => {
    fetchBusinessPlan();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};