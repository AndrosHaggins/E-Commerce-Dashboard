import { Grid, Box, Stack } from '@mantine/core';
import { BarChartCard } from './BarChartCard';
import { PieChartCard } from './PieChartCard';
import { useTopProductsData } from '@/app/hooks/useTopProductsData'; // Adjust the import path accordingly
import { useCustomerAcquisitionSourcesData } from '@/app/hooks/useCustomerAcquisitionSourcesData'; // Adjust the import path accordingly

const title = "Customer Acquisition Sources";

export default function Report() {
  const { topProducts, isLoading: isLoadingTopProducts, error: errorTopProducts } = useTopProductsData();
  const { acquisitionSources, isLoading: isLoadingAcquisitionSources, error: errorAcquisitionSources } = useCustomerAcquisitionSourcesData();

  if (isLoadingTopProducts || isLoadingAcquisitionSources) {
    return <div>Loading...</div>; // Add a loading state if necessary
  }

  if (errorTopProducts || errorAcquisitionSources) {
    return <div>Error loading data: {errorTopProducts?.message || errorAcquisitionSources?.message}</div>; // Handle error state
  }

  // Transform the data to match the format expected by BarChartCard
  const BarData = topProducts.map((product) => ({
    month: product.product_name, // Using product_name as the key for each row
    'Total Sold': product.total_quantity_sold, // 'Total Sold' is the dynamic key
  }));

  const barSeries = [
    { name: 'Total Sold', color: 'violet.6' }, // Ensure this matches the dynamic key used in BarData
  ];

  // Transform the data to match the format expected by PieChartCard
  const pieData = acquisitionSources.map((source) => ({
    name: source.sourcename,
    value: source.customer_count,
    color: generateColor(source.sourcename), // Function to generate color dynamically if needed
  }));

  return (
    <>
      <Stack>
        <PieChartCard data={pieData} title={title} />
        <BarChartCard data={BarData} series={barSeries} title={title}/>
      </Stack>
    </>
  );
}

// Optional: A simple function to generate colors dynamically based on the source name
function generateColor(sourcename: string): string {
  const colors = ['indigo.6', 'yellow.6', 'teal.6', 'gray.6', 'blue.6', 'red.6'];
  // Assign a color based on the hash of the source name
  const index = Math.abs(sourcename.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
  return colors[index];
}
