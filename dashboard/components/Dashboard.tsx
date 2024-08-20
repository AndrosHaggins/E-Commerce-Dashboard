import { Grid, Box, Loader, Center, Alert} from '@mantine/core';
import StatusCard from '@/components/StatusCard'; 
import { IconAlertCircle } from '@tabler/icons-react';
import DataTable from '@/components/DataTable';
import LineGraphCard from '@/components/LineGraphCard';
import { useFeedbackData } from '@/app/hooks/useFeedbackData';
import { useProductData } from '@/app/hooks/useProductData';
import { useDashboardStats } from '@/app/hooks/useDashboardStats';
import { useDailyOrders } from '@/app/hooks/useDailyOrders';
import { FeedbackData, ProductData, DailyOrder } from '@/types/dashboardTypes';

// Columns for FeedbackTable
const feedbackColumns = [
  { key: 'customer', label: 'Customer' },
  { key: 'product', label: 'Product' },
  { key: 'feedbackDate', label: 'Feedback Date' },
  { key: 'rating', label: 'Rating' },
  { key: 'comments', label: 'Comments' },
];

// Columns for Product Inventory Table
const productColumns = [
  { key: 'product', label: 'Product' },
  { key: 'amount', label: 'Amount in Stock' },
  { key: 'lastRestock', label: 'Last Restock Date' },
];


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

export default function Dashboard() {
  const { feedbackData, isLoading: isFeedbackLoading, error: feedbackError } = useFeedbackData(10000);
  const { productData, isLoading: isProductLoading, error: productError } = useProductData(10000);
  const { stats, isLoading: isStatsLoading, error: statsError } = useDashboardStats(10000);
  const { dailyOrders, isLoading: isDailyOrdersLoading, error: dailyOrdersError } = useDailyOrders(10000);

  const loadingStates = [isStatsLoading, isFeedbackLoading, isProductLoading, isDailyOrdersLoading];
  const errors = [statsError, feedbackError, productError, dailyOrdersError];

  const loadingOrError = handleLoadingAndError(loadingStates, errors);
  if (loadingOrError) return loadingOrError;
 
  // Format feedback data to match columns
  const formattedFeedbackData = feedbackData.map((item: FeedbackData) => ({
    customer: `${item.customers?.firstname} ${item.customers?.lastname}`,
    product: item.products?.title,
    feedbackDate: new Date(item.feedbackdate).toLocaleDateString(),
    rating: item.rating,
    comments: item.feedback,
  }));

  // Format product data to match columns
  const formattedProductData = productData.map((item: ProductData) => ({
    product: item.title,
    amount: item.stockquantity,
    lastRestock: new Date(item.updatedat).toLocaleDateString(),
  }));

  // Format daily orders data to use local date format
  const formattedDailyOrders = dailyOrders.map((item: DailyOrder) => ({
    date: new Date(item.date).toLocaleDateString(),
    sales: item.sales,
  }));
  
  return (
    <>
      <Grid gutter="md" mb={16}>
        <Grid.Col span={{ base: 12, md: 12, lg: 3 }}>
          {stats && (
            <StatusCard
              title="Revenue"
              value={stats.totalRevenue}
              type="dollar"
              status={stats.totalRevenueStatus}
              percentageChange={stats.totalRevenueChange}
            />
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 3 }}>
          {stats && (
            <StatusCard
              title="Customer Acquisition Rate (CaR)"
              value={stats.acquisitionRate}
              type="percentage"
              status={stats.acquisitionRateStatus}
              percentageChange={stats.acquisitionRateChange}
            />
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 3 }}>
          {stats && (
            <StatusCard
              title="New Customers"
              value={stats.newCustomers}
              type="number"
              status={stats.newCustomersStatus}
              percentageChange={stats.newCustomersChange}
            />
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 3 }}>
          {stats && (
            <StatusCard
              title="Total Orders"
              value={stats.totalOrders}
              type="number"
              status={stats.totalOrdersStatus}
              percentageChange={stats.totalOrdersChange}
            />
          )}
        </Grid.Col>
      </Grid>
      <Grid gutter="md" mb={16}>
        <Grid.Col span={{ base: 12, md: 12, lg: 9 }}>
          <Box>
            <DataTable columns={feedbackColumns} data={formattedFeedbackData} title="Customer Feedback" />
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12, md: 12, lg: 3 }}>
          <Box>
            <DataTable columns={productColumns} data={formattedProductData} title="Product Inventory" />
          </Box>
        </Grid.Col>
      </Grid>
      <LineGraphCard 
        data={formattedDailyOrders} 
        title="Daily Orders" 
        seriesName="sales" 
      />
    </>
  );
}
