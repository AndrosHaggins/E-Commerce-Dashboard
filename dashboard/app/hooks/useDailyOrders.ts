import { useState, useEffect } from 'react';
import { DailyOrder } from '@/types/dashboardTypes';
/**
 * useDailyOrders Hook
 * 
 * A custom hook that fetches daily orders data from an API endpoint.
 * It provides automatic polling at a specified interval to keep the data up-to-date.
 * 
 * @param {number} [pollingInterval=60000] - The interval (in milliseconds) at which the data should be refreshed. Defaults to 60 seconds.
 * @returns {{ dailyOrders: DailyOrder[], isLoading: boolean, error: Error | null }} 
 * - dailyOrders: The array of daily orders data, each representing an order with associated details.
 * - isLoading: A boolean indicating if the data is currently being loaded.
 * - error: An error object if an error occurred during data fetching, or null if no error occurred.
 * 
 * This hook manages the data fetching, error handling, and loading state for daily orders data,
 * while also supporting polling to automatically refresh the data at regular intervals.
 */
export function useDailyOrders(pollingInterval = 60000) {
  const [dailyOrders, setDailyOrders] = useState<DailyOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDailyOrders = async () => {
    try {
      const response = await fetch('/api/orders/dailyOrders');
      if (!response.ok) {
        const errorMessage = `Failed to fetch daily orders: ${response.status} ${response.statusText}`;
        
          // log the  detailed error to the console for developer debugging
        // provide a user friendly error message to the user without the detailed message. 
        console.error(errorMessage);
        
     
        throw new Error('Failed to load daily orders. Please try again later.');
      }
      const data = await response.json();
      setDailyOrders(data);
      setError(null); // Clear any previous errors if the request succeeds
    } catch (err) {
      // Set a generic error message for the client
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyOrders(); // Fetch data on component mount
    // Polling mechanism: 
    // We use setInterval to periodically refresh the data
    const interval = setInterval(fetchDailyOrders, pollingInterval);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [pollingInterval]);

  return { dailyOrders, isLoading, error };
}
