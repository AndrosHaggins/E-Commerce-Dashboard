import { useState, useEffect } from 'react';

interface CustomerAcquisitionSourceData {
  sourcename: string;
  customer_count: number;
}

export function useCustomerAcquisitionSourcesData(pollingInterval = 60000) {
  const [acquisitionSources, setAcquisitionSources] = useState<CustomerAcquisitionSourceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAcquisitionSources = async () => {
    try {
      const response = await fetch('/api/customers/getCustomerAcquisitionSources');
      if (!response.ok) {
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

    const interval = setInterval(fetchAcquisitionSources, pollingInterval);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [pollingInterval]);

  return { acquisitionSources, isLoading, error };
}
