"use client"; // Ensure this is present for client-side rendering

import React from 'react';
import { Card, Title } from '@mantine/core';
import { LineChart } from '@mantine/charts';



export interface DataPoint {
  date: string;
  sales: number;
}

export interface LineGraphCardProps {
  data: DataPoint[];
  title: string;
  seriesName: string;
  color?: string;
  curveType?: 'linear' | 'monotone' | 'step';
}

const LineGraphCard: React.FC<LineGraphCardProps> = ({ data, title, seriesName }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title mb={30} order={3}>{title}</Title>
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        series={[{ name: seriesName, color: 'indigo.6' }]}
        curveType="linear"
      />
    </Card>
  );
};

export default LineGraphCard;






