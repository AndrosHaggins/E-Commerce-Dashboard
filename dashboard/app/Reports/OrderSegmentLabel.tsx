import { DonutChart, PieChart } from '@mantine/charts';
import { Card, Title } from '@mantine/core';
export const data = [
    { name: 'USA', value: 400, color: 'indigo.6' },
    { name: 'India', value: 300, color: 'yellow.6' },
    { name: 'Japan', value: 100, color: 'teal.6' },
    { name: 'Other', value: 200, color: 'gray.6' },
  ];
export function OrderDonutChart() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Title pb={20} order={3}>Real-Time Sales</Title>
  <PieChart w={300} h={300}   withTooltip tooltipDataSource="segment" mx="auto" data={data} />
  </Card>
);
}