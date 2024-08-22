"use client";
import { BarChart } from '@mantine/charts';
import { Card, Title} from '@mantine/core';

interface BarChartData {
  month: string;
  [key: string]: number | string; // Allows dynamic keys to be string or numbers
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

/**
 * BarChartCard Component
 * 
 * A reusable component that wraps a BarChart inside a styled Card. 
 * 
 * @param {BarChartData[]} data - The data to be displayed in the chart, where each object should include a 'month' key and other dynamic keys corresponding to the series.
 * @param {BarChartSeries[]} series - The configuration for each data series, including the name and color.
 * @param {string} title - The title of the card, displayed above the chart.
 * @param {string} xAxisLabel - The label for the x-axis of the chart.
 * @param {string} yAxisLabel - The label for the y-axis of the chart.
 * 
 * This component is designed to be flexible and reusable, allowing different datasets 
 * and series configurations to be visualized in a consistent manner. The chart is rendered 
 * within a Card component, making it easy to use within dashboards or reports.
 */
const BarChartCard: React.FC<BarChartCardProps> = ({ data, series, title, xAxisLabel, yAxisLabel }) => {
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

export default BarChartCard;