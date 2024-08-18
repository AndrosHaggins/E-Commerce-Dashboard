// components/SalesLineGraph.tsx

"use client"; // Ensure this is present for client-side rendering

import React from 'react';
import { Card, Title } from '@mantine/core';
import { LineChart } from '@mantine/charts';

const SalesLineGraph = () => {
  // Hardcoded data for now
  const data = [
    { date: 'January', sales: 1500 },
    { date: 'February', sales: 2100 },
    { date: 'March', sales: 1800 },
    { date: 'April', sales: 2200 },
    { date: 'May', sales: 2900 },
    { date: 'June', sales: 3200 },
  ];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title pb={20} order={3}>Real-Time Sales</Title>
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        series={[{ name: 'sales', color: 'indigo.6' }]}
        curveType="linear"
      />
    </Card>
  );
};

export default SalesLineGraph;
