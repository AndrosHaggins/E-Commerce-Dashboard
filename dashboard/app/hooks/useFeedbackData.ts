import { useState, useEffect } from 'react';
import { FeedbackData } from '@/types/dashboardTypes';

export function useFeedbackData(pollingInterval = 60000) {
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFeedbackData = async () => {
    try {
      const response = await fetch('/api/customers/getCustomerFeedback');
      if (!response.ok) {
        const errorMessage = `Failed to fetch customer feedback: ${response.status} ${response.statusText}`;
        
        // log the  detailed error to the console for developer debugging
        // provide a user friendly error message to the user without the detailed message. 
        console.error(errorMessage);
        
       
        throw new Error('Failed to load customer feedback. Please try again later.');
      }
      const data = await response.json();
      setFeedbackData(data);
      setError(null); // Clear any previous errors if the request succeeds
    } catch (err) {
      // Set a generic error message for the client
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbackData(); // Fetch data on component mount

    const interval = setInterval(fetchFeedbackData, pollingInterval);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [pollingInterval]);

  return { feedbackData, isLoading, error };
}
