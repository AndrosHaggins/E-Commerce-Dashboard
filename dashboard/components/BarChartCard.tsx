"use client";
import { BarChart } from '@mantine/charts';
import { Card, Title} from '@mantine/core';

interface BarChartData {
  month: string;
  [key: string]: number | string; // Allows for 'month' to be a string and other dynamic keys to be numbers
}

interface BarChartSeries {
  name: string;
  color: string;
}

interface BarChartCardProps {
  data: BarChartData[];
  series: BarChartSeries[];
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
}

export function BarChartCard({ data, series, title, xAxisLabel, yAxisLabel }: BarChartCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title pb={20} order={3}>{title}</Title>
      <BarChart
        h={300}
        data={data}
        dataKey="month"
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
        series={series}
        tickLine="y"
      />
    </Card>
  );
}
