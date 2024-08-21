import { useState, useEffect } from 'react';
import { ProductData } from '@/types/dashboardTypes';

/**
 * useProductData Hook
 * 
 * A custom hook that fetches product data from an API endpoint.
 * It provides automatic polling at a specified interval to keep the data up-to-date.
 * 
 * @param {number} [pollingInterval=60000] - The interval (in milliseconds) at which the data should be refreshed. Defaults to 60 seconds.
 * @returns {{ productData: ProductData[], isLoading: boolean, error: Error | null }} 
 * - productData: The array of product data, each containing product details.
 * - isLoading: A boolean indicating if the data is currently being loaded.
 * - error: An error object if an error occurred during data fetching, or null if no error occurred.
 * 
 * This hook manages the data fetching, error handling, and loading state for product data,
 * while also supporting polling to automatically refresh the data at regular intervals.
 */
export function useProductData(pollingInterval = 60000) {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProductData = async () => {
    try {
      const response = await fetch('/api/products/getProductData');
      if (!response.ok) {
        const errorMessage = `Failed to fetch product data: ${response.status} ${response.statusText}`;
        
        // log the  detailed error to the console for developer debugging
        // provide a user friendly error message to the user without the detailed message. 
        console.error(errorMessage);
        
        
        throw new Error('Failed to load product data. Please try again later.');
      }
      const data = await response.json();
      setProductData(data);
      setError(null); // Clear any previous errors if the request succeeds
    } catch (err) {
      // Set a generic error message for the client
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData(); // Fetch data on component mount
    // Polling mechanism: 
    // We use setInterval to periodically refresh the data
    const interval = setInterval(fetchProductData, pollingInterval);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [pollingInterval]);

  return { productData, isLoading, error };
}
