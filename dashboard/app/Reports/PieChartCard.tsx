import { PieChart } from '@mantine/charts';
import { Card, Title } from '@mantine/core';
interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface PieChartCardProps {
  data: PieChartData[];
  title: string;
}
export function PieChartCard({ data, title }: PieChartCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title pb={20} order={3}>{title}</Title>
      <PieChart w={300} h={300} withLabelsLine labelsPosition="outside" labelsType="percent" withLabels mx="auto" data={data} />
    </Card>
  );
}
