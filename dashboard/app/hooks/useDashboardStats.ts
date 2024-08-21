import { useState, useEffect } from 'react';
import { DashboardStats } from '@/types/dashboardTypes';
/**
 * useDashboardStats Hook
 * 
 * A custom hook that fetches dashboard statistics from an API endpoint.
 * It provides automatic polling at a specified interval to keep the data up-to-date.
 * 
 * @param {number} [pollingInterval=60000] - The interval (in milliseconds) at which the data should be refreshed. Defaults to 60 seconds.
 * @returns {{ stats: DashboardStats | null, isLoading: boolean, error: Error | null }} 
 * - stats: An object containing various dashboard statistics, or null if the data is not yet loaded.
 * - isLoading: A boolean indicating if the data is currently being loaded.
 * - error: An error object if an error occurred during data fetching, or null if no error occurred.
 * 
 * This hook manages the data fetching, error handling, and loading state for dashboard statistics,
 * while also supporting polling to automatically refresh the data at regular intervals.
 */
export function useDashboardStats(pollingInterval = 60000) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/stats/getDashboardStats');
      if (!response.ok) {
        const errorMessage = `Failed to fetch dashboard stats: ${response.status} ${response.statusText}`;
        
        // log the  detailed error to the console for developer debugging
        // provide a user friendly error message to the user without the detailed message. 
        console.error(errorMessage);
        
        
        throw new Error('Failed to load dashboard stats. Please try again later.');
      }
      const data = await response.json();

      // Ensure that all fields have a default value
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
    // Polling mechanism: 
    // We use setInterval to periodically refresh the data
    const interval = setInterval(fetchDashboardStats, pollingInterval);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [pollingInterval]);

  return { stats, isLoading, error };
}
