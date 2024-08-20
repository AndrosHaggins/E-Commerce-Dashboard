import { useState, useEffect } from 'react';
import { DailyOrder } from '@/types/dashboardTypes';

export function useDailyOrders(pollingInterval = 60000) {
  const [dailyOrders, setDailyOrders] = useState<DailyOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDailyOrders = async () => {
    try {
      const response = await fetch('/api/orders/dailyOrders');
      if (!response.ok) {
        const errorMessage = `Failed to fetch daily orders: ${response.status} ${response.statusText}`;
        
        // Log detailed error to the console
        console.error(errorMessage);
        
        // Throw a generic error to be handled by the client
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

    const interval = setInterval(fetchDailyOrders, pollingInterval);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [pollingInterval]);

  return { dailyOrders, isLoading, error };
}
