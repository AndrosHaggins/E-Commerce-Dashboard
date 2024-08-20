import { useState, useEffect } from 'react';
import { ProductData } from '@/types/dashboardTypes';

export function useProductData(pollingInterval = 60000) {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProductData = async () => {
    try {
      const response = await fetch('/api/products/getProductData');
      if (!response.ok) {
        const errorMessage = `Failed to fetch product data: ${response.status} ${response.statusText}`;
        
        // Log detailed error to the console
        console.error(errorMessage);
        
        // Throw a generic error to be handled by the client
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

    const interval = setInterval(fetchProductData, pollingInterval);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [pollingInterval]);

  return { productData, isLoading, error };
}
