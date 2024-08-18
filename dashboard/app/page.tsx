"use client"
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Group, AppShell, Burger, Title, Box} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Dashboard from '@/components/Dashboard';
import Sidebar from '@/components/Sidebar';

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

export default function HomePage() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header >
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <Title order={2}>BarkMart</Title>
        </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
        
          <Box>
          <Sidebar/>
          </Box>
         
        </AppShell.Navbar>
        <AppShell.Main>
        <Dashboard/>
       
        </AppShell.Main>
      </AppShell>
    </>
  );
}
