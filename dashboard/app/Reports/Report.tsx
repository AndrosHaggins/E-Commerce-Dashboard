import { Grid, Box, Stack} from '@mantine/core';
import StatusCard from '@/components/TotalSoldCard';
import DataTable from '@/components/DataTable';
import SalesLineGraph from '@/components/SalesLineGraph';
import { ReportBarChart } from './ReportBarChart';
import { OrderDonutChart } from './OrderSegmentLabel';

export default function Report() {
  
    return (
      <>
        <Stack>
        <OrderDonutChart/>
        <ReportBarChart/>
        <SalesLineGraph />
        </Stack>
      </>
    );
  }