

import { Grid, Box } from '@mantine/core';
import StatusCard from '@/components/TotalSoldCard';
import DataTable from '@/components/DataTable';
import SalesLineGraph from '@/components/SalesLineGraph';

// Sample data for FeedbackTable
const feedbackColumns = [
  { key: 'name', label: 'Name' },
  { key: 'product', label: 'Product' },
  { key: 'feedbackDate', label: 'Feedback Date' },
  { key: 'rating', label: 'Rating' },
  { key: 'comments', label: 'Comments' },
];

const feedbackData = [
  { name: 'John Doe', product: 'Product A', feedbackDate: '2023-08-01', rating: 4, comments: 'Great product, very useful!' },
  { name: 'Jane Smith', product: 'Product B', feedbackDate: '2023-08-05', rating: 5, comments: 'Excellent quality and fast shipping!' },
  { name: 'Alice Johnson', product: 'Product C', feedbackDate: '2023-08-10', rating: 3, comments: 'Good, but could be improved.' },
  { name: 'Bob Brown', product: 'Product D', feedbackDate: '2023-08-12', rating: 2, comments: 'Not satisfied with the purchase.' },
];

// Sample data for Product Inventory Table
const productColumns = [
  { key: 'product', label: 'Product' },
  { key: 'amount', label: 'Amount in Stock' },
  { key: 'lastRestock', label: 'Last Restock Date' },
];

const productData = [
  { product: 'Product A', amount: 100, lastRestock: '2023-07-20' },
  { product: 'Product B', amount: 50, lastRestock: '2023-07-15' },
  { product: 'Product C', amount: 200, lastRestock: '2023-08-01' },
  { product: 'Product D', amount: 0, lastRestock: '2023-06-30' },
];

export default function Dashboard() {
  
  return (
    <>
      <Grid gutter="md" mb={16}>
        <Grid.Col span={3}>
          <StatusCard
            title="Revenue"
            value={1200}
            type="dollar"
            status="increase"
            statusColor="green"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatusCard
            title="Customer Acuquistion Rate (CaR)"
            value={15.5}
            type="percentage"
            status="decrease"
            statusColor="red"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatusCard
            title="New Customers"
            value={300}
            type="number"
            status="increase"
            statusColor="green"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatusCard
            title="Orders"
            value={1000 }
            type="number"
            status="increase"
            statusColor="green"
          />
        </Grid.Col>
      </Grid>
      <Grid gutter="md" mb={16}>
        <Grid.Col span={{ base: 9, md: 12, lg: 9 }}>
          <Box>
            <DataTable columns={feedbackColumns} data={feedbackData} title="Customer Feedback" />
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 3, md: 12, lg: 3 }}>
          <Box>
            <DataTable columns={productColumns} data={productData} title="Product Inventory" />
          </Box>
        </Grid.Col>
      </Grid>
      <SalesLineGraph />
    </>
  );
}
