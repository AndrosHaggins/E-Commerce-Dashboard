import { useState, useEffect } from 'react';
import { DashboardStats } from '@/types/dashboardTypes';

export function useDashboardStats(pollingInterval = 60000) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/stats/getDashboardStats');
      if (!response.ok) {
        const errorMessage = `Failed to fetch dashboard stats: ${response.status} ${response.statusText}`;
        
        // Log detailed error to the console
        console.error(errorMessage);
        
        // Throw a generic error to be handled by the client
        throw new Error('Failed to load dashboard stats. Please try again later.');
      }
      const data = await response.json();

      // Ensure that all fields have a default value and remove "neutral"
      setStats({
        totalRevenue: data.totalRevenue ?? 0,
        acquisitionRate: data.acquisitionRate ?? 0,
        newCustomers: data.newCustomers ?? 0,
        totalOrders: data.totalOrders ?? 0,
        totalRevenueStatus: (data.totalRevenueStatus === 'increase' || data.totalRevenueStatus === 'decrease') ? data.totalRevenueStatus : undefined,
        totalRevenueChange: data.totalRevenueChange ?? 0,
        acquisitionRateStatus: (data.acquisitionRateStatus === 'increase' || data.acquisitionRateStatus === 'decrease') ? data.acquisitionRateStatus : undefined,
        acquisitionRateChange: data.acquisitionRateChange ?? 0,
        newCustomersStatus: (data.newCustomersStatus === 'increase' || data.newCustomersStatus === 'decrease') ? data.newCustomersStatus : undefined,
        newCustomersChange: data.newCustomersChange ?? 0,
        totalOrdersStatus: (data.totalOrdersStatus === 'increase' || data.totalOrdersStatus === 'decrease') ? data.totalOrdersStatus : undefined,
        totalOrdersChange: data.totalOrdersChange ?? 0,
      });

      setError(null); // Clear any previous errors if the request succeeds
    } catch (err) {
      // Set a generic error message for the client
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();

    const interval = setInterval(fetchDashboardStats, pollingInterval);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [pollingInterval]);

  return { stats, isLoading, error };
}
