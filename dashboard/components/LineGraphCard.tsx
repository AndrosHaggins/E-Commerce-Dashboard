"use client"; 
import React from 'react';
import { Card, Title } from '@mantine/core';
import { LineChart } from '@mantine/charts';

export interface DataPoint {
  [key: string]: string | number; // Making this generic to support different data keys
}

export interface LineGraphCardProps {
  data: DataPoint[];
  title: string;
  seriesName: string;
  dataKey: string; 
  color?: string;
  curveType?: 'linear' | 'monotone' | 'step';
}

/**
 * LineGraphCard Component
 * 
 * A reusable component that wraps a LineChart inside a styled Card. 
 * 
 * @param {DataPoint[]} data - The data to be displayed in the line chart.
 * @param {string} title - The title of the card, displayed above the line chart.
 * @param {string} seriesName - The name of the data series, displayed in the chart legend.
 * @param {string} dataKey - The key in the data objects to be used for the x-axis.
 * @param {string} [color='indigo.6'] - Optional color for the line in the chart. Defaults to 'indigo.6'.
 * @param {'linear' | 'monotone' | 'step'} [curveType='linear'] - Optional curve type for the line, with options for 'linear', 'monotone', or 'step'. Defaults to 'linear'.
 * 
 * This component is designed to be flexible and reusable, allowing different datasets and 
 * configurations to be visualized in a consistent manner. The chart is rendered within a Card component,
 * making it easy to use within dashboards or reports.
 */
const LineGraphCard: React.FC<LineGraphCardProps> = ({ data, title, seriesName, dataKey, color = 'indigo.6', curveType = 'linear' }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title mb={30} order={3}>{title}</Title>
      <LineChart
        h={300}
        data={data}
        dataKey={dataKey} // Using the dataKey prop here
        series={[{ name: seriesName, color }]}
        curveType={curveType}
      />
    </Card>
  );
};

export default LineGraphCard;
