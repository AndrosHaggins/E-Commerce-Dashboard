'use client';

import { Card, Text, useMantineColorScheme, Title } from '@mantine/core';


export interface StatusCardProps {
  title: string;
  value: number;
  type: 'percentage' | 'dollar' | 'number';
  status?: 'increase' | 'decrease'; 
  percentageChange?: number; 
}


/**
 * StatusCard Component
 * 
 * A reusable card component that displays a title, a formatted value, and an optional status indicator.
 * The value is formatted based on the specified type (percentage, dollar, or number).
 * If a status is provided, an icon (▲ or ▼) and a percentage change relative to the previous period are shown.
 * The card's background color adapts to the current theme (light or dark).
 * 
 * @param {string} title - The title displayed at the top of the card.
 * @param {number} value - The main value displayed in the card, formatted according to the type.
 * @param {'percentage' | 'dollar' | 'number'} type - The format type for the value (percentage, dollar, or number).
 * @param {'increase' | 'decrease'} [status] - Optional status indicating an increase or decrease, which adds an icon and color to the display.
 * @param {number} [percentageChange] - Optional percentage change value to be displayed next to the status icon.
 */
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
      style={{ textAlign: 'left' }}
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
