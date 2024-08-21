import { useState, useEffect } from 'react';

interface TopProductData {
  product_name: string;
  total_quantity_sold: number;
}

export function useTopProductsData(pollingInterval = 60000) {
  const [topProducts, setTopProducts] = useState<TopProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTopProducts = async () => {
    try {
      const response = await fetch('/api/products/getTopProducts');
      if (!response.ok) {
        const errorMessage = `Failed to fetch top products: ${response.status} ${response.statusText}`;
        // log the  detailed error to the console for developer debugging
        // provide a user friendly error message to the user without the detailed message. 
        console.error(errorMessage);
        
        throw new Error('Failed to load top products. Please try again later.');
      }
      const data = await response.json();
      setTopProducts(data);
      setError(null); // Clear any previous errors if the request succeeds
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopProducts(); // Fetch data on component mount
    // Polling mechanism: 
    // We use setInterval to periodically refresh the data
    const interval = setInterval(fetchTopProducts, pollingInterval);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [pollingInterval]);

  return { topProducts, isLoading, error };
}
