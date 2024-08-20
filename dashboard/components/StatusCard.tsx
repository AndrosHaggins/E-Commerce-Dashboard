'use client';

import { Card, Text, useMantineColorScheme, Title } from '@mantine/core';


export interface StatusCardProps {
  title: string;
  value: number;
  type: 'percentage' | 'dollar' | 'number';
  status?: 'increase' | 'decrease'; // Allow status to be undefined
  percentageChange?: number; // Allow percentageChange to be undefined
}


const StatusCard: React.FC<StatusCardProps> = ({ title, value, type, status, percentageChange }) => {
  const { colorScheme } = useMantineColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#1A1B1E' : '#fcd9b8';

 

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

  const statusIcon = status === 'increase' ? '▲' : status === 'decrease' ? '▼' : '';
  const statusColor = status === 'increase' ? 'green' : status === 'decrease' ? 'red' : 'gray';

  return (
    <Card
      shadow="sm"
      radius="md"
      w="100%"
      h="100%"
      
      bg={backgroundColor}
      style={{
        textAlign: 'left',
      }}
    >
      <Text size="md" fw={500} mb={8}>
        {title}
      </Text>
      <Title order={2} mb={8}>
        {formattedValue}
      </Title>
      {status && (
        <Text c={statusColor} fw={500}>
          {statusIcon} {percentageChange ?? 0}% vs last month
        </Text>
      )}
    </Card>
  );
};


export default StatusCard;
