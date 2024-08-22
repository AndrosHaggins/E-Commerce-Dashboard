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
/**
 * PieChartCard Component
 * 
 * A reusable component that wraps a PieChart inside a styled Card. 
 * 
 * @param {PieChartData[]} data - The data to be displayed in the pie chart, where each object should include a 'name' key for the segment, a 'value' key for the size, and a 'color' key for the segment color.
 * @param {string} title - The title of the card, displayed above the pie chart.
 * 
 * This component is designed to be flexible and reusable, allowing different datasets 
 * to be visualized in a consistent manner. The chart is rendered within a Card component, 
 * making it easy to use within dashboards or reports.
 */
const PieChartCard: React.FC<PieChartCardProps> = ({ data, title }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title pb={20} order={3}>{title}</Title>
      <PieChart withLabelsLine labelsPosition="outside" labelsType="percent"  withTooltip tooltipDataSource="segment" withLabels mx="auto" data={data} />
    </Card>
  );
}

export default PieChartCard;
