'use client';

import { Card, Text, useMantineColorScheme, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

interface StatusCardProps {
  title: string;
  value: number;
  type: 'percentage' | 'dollar' | 'number';
  status: 'increase' | 'decrease';
  statusColor: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, type, status, statusColor }) => {
  const { colorScheme } = useMantineColorScheme();
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    setBackgroundColor(colorScheme === 'dark' ? '#1A1B1E' : '#fff');
  }, [colorScheme]);

  const formattedValue = (() => {
    switch (type) {
      case 'percentage':
        return `${value}%`;
      case 'dollar':
        return `$${value.toLocaleString()}`;
      case 'number':
      default:
        return value.toLocaleString();
    }
  })();

  const statusIcon = status === 'increase' ? '▲' : '▼';

  return (
    <Card
      shadow="sm"
   
      radius="md"
      w='100%'
      h='100%'
      bg={backgroundColor}
      style={{
        
        height: "100%",
        textAlign: 'left',
    
      }}
    >
      <Text size="md" fw={500} mb={8}>
        {title}
      </Text>
      <Title order={2} mb={8}>{formattedValue}</Title>
      <Text c={statusColor} fw={500}>
        {statusIcon} 17% vs last month
      </Text>
    </Card>
  );
};

export default StatusCard;
