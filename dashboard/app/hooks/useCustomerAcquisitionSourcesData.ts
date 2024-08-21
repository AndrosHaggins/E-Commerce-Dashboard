import { useState, useEffect } from 'react';

interface CustomerAcquisitionSourceData {
  sourcename: string;
  customer_count: number;
}
/**
 * useCustomerAcquisitionSourcesData Hook
 * 
 * A custom hook that fetches data on customer acquisition sources from an API endpoint.
 * It provides automatic polling at a specified interval to keep the data up-to-date.
 * 
 * @param {number} [pollingInterval=60000] - The interval (in milliseconds) at which the data should be refreshed. Defaults to 60 seconds.
 * @returns {{ acquisitionSources: CustomerAcquisitionSourceData[], isLoading: boolean, error: Error | null }} 
 * - acquisitionSources: The array of customer acquisition source data, each containing the source name and customer count.
 * - isLoading: A boolean indicating if the data is currently being loaded.
 * - error: An error object if an error occurred during data fetching, or null if no error occurred.
 * 
 * This hook manages the data fetching, error handling, and loading state for customer acquisition source data,
 * while also supporting polling to automatically refresh the data at regular intervals.
 */
export function useCustomerAcquisitionSourcesData(pollingInterval = 60000) {
  const [acquisitionSources, setAcquisitionSources] = useState<CustomerAcquisitionSourceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAcquisitionSources = async () => {
    try {
      const response = await fetch('/api/customers/getCustomerAcquisitionSources');
      if (!response.ok) {
        // log the  detailed error to the console for developer debugging
        // provide a user friendly error message to the user without the detailed message. 
        const errorMessage = `Failed to fetch customer acquisition sources: ${response.status} ${response.statusText}`;
        
        console.error(errorMessage);
        
        throw new Error('Failed to load customer acquisition sources. Please try again later.');
      }
      const data = await response.json();
      setAcquisitionSources(data);
      setError(null); // Clear any previous errors if the request succeeds
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAcquisitionSources(); // Fetch data on component mount
    // Polling mechanism: 
    // We use setInterval to periodically refresh the data
    const interval = setInterval(fetchAcquisitionSources, pollingInterval);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [pollingInterval]);

  return { acquisitionSources, isLoading, error };
}
