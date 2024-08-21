import { Stack, Center, Loader, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { BarChartCard } from '@/components/BarChartCard';
import { PieChartCard } from '@/components/PieChartCard';
import { useTopProductsData } from '@/app/hooks/useTopProductsData';
import { useCustomerAcquisitionSourcesData } from '@/app/hooks/useCustomerAcquisitionSourcesData';



export default function Report() {
  const { topProducts, isLoading: isLoadingTopProducts, error: errorTopProducts } = useTopProductsData();
  const { acquisitionSources, isLoading: isLoadingAcquisitionSources, error: errorAcquisitionSources } = useCustomerAcquisitionSourcesData();

  const loadingOrError = handleLoadingAndError(
    [isLoadingTopProducts, isLoadingAcquisitionSources],
    [errorTopProducts, errorAcquisitionSources]
  );
  if (loadingOrError) return loadingOrError;

  const barData = topProducts.map((product) => ({
    month: product.product_name,
    'Total Sold': product.total_quantity_sold,
  }));

  const barSeries = [
    { name: 'Total Sold', color: 'violet.6' },
  ];

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

function generateColor(sourcename: string): string {
  const colors = ['indigo.6', 'yellow.6', 'teal.6', 'gray.6', 'blue.6', 'red.6'];
  const index = Math.abs(sourcename.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
  return colors[index];
}

// Helper function to handle loading and error states
function handleLoadingAndError(loadingStates: boolean[], errors: (Error | null)[]) {
  if (loadingStates.some(loading => loading)) {
    return (
      <Center style={{ minHeight: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  for (const error of errors) {
    if (error) {
      return (
        <Center style={{ minHeight: '100vh' }}>
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" radius="md" variant="filled">
            {error.message}
          </Alert>
        </Center>
      );
    }
  }

  return null;
}
