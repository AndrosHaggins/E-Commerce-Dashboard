import { Stack, Center, Loader, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { BarChartCard } from '@/components/BarChartCard';
import { PieChartCard } from '@/components/PieChartCard';
import { useTopProductsData } from '@/app/hooks/useTopProductsData';
import { useCustomerAcquisitionSourcesData } from '@/app/hooks/useCustomerAcquisitionSourcesData';
import { handleLoadingAndError } from '@/utils/handleLoadingAndError';

/**
 * Report Component
 * 
 * This component displays a report consisting of a pie chart and a bar chart.
 * It fetches data for the top products and customer acquisition sources using custom hooks,
 * then displays this data using reusable chart components.
 * 
 * Loading and error states are handled centrally using the handleLoadingAndError utility function.
 */
export default function Report() {
  const { topProducts, isLoading: isLoadingTopProducts, error: errorTopProducts } = useTopProductsData();
  const { acquisitionSources, isLoading: isLoadingAcquisitionSources, error: errorAcquisitionSources } = useCustomerAcquisitionSourcesData();

  const loadingOrError = handleLoadingAndError(
    [isLoadingTopProducts, isLoadingAcquisitionSources],
    [errorTopProducts, errorAcquisitionSources]
  );
  if (loadingOrError) return loadingOrError;
  // Prepare data for the BarChartCard component
  const barData = topProducts.map((product) => ({
    month: product.product_name,
    'Total Sold': product.total_quantity_sold,
  }));

  const barSeries = [
    { name: 'Total Sold', color: 'violet.6' },
  ];
  // Prepare data for the PieChartCard component
  const pieData = acquisitionSources.map((source) => ({
    name: source.sourcename,
    value: source.customer_count,
    color: generateColor(source.sourcename),
  }));

  return (
    <Stack>
      <PieChartCard data={pieData} title="Customer Acquisition Sources" />
      <BarChartCard data={barData} xAxisLabel="label for x axis" yAxisLabel="yAxisLabel" series={barSeries} title="Product Popularity" />
    </Stack>
  );
}

/**
 * generateColor
 * 
 * A helper function that generates a color based on the input string (sourcename).
 * It assigns a color by calculating an index from the sum of the character codes in the string,
 * ensuring consistent color assignment for the same input string.
 * 
 * @param {string} sourcename - The source name to generate a color for.
 * @returns {string} The generated color as a Mantine theme color string.
 */
function generateColor(sourcename: string): string {
  const colors = ['indigo.6', 'yellow.6', 'teal.6', 'gray.6', 'blue.6', 'red.6'];
  const index = Math.abs(sourcename.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
  return colors[index];
}

