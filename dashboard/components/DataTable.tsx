import React from 'react';
import { Table, Card, ScrollArea, Title} from '@mantine/core';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  data: Array<{ [key: string]: any }>;
  title: string;
}
/**
 * DataTable Component
 * 
 * A reusable component that renders a table within a styled Card. The table displays data according to the specified columns,
 * and is wrapped in a scrollable area to handle overflow.
 * 
 * @param {Column[]} columns - An array of column definitions, where each object includes a 'key' (the data key) and a 'label' (the column header).
 * @param {Array<{ [key: string]: any }>} data - The data to be displayed in the table, where each object represents a row, and each key corresponds to a column key.
 * @param {string} title - The title of the card, displayed above the table.
 * 
 * This component is designed to be flexible and reusable, allowing different datasets and column configurations 
 * to be visualized in a consistent manner. The table is rendered within a Card component and includes scrollable 
 * functionality to handle larger datasets.
 */
const DataTable: React.FC<DataTableProps> = ({ columns, data, title }) => {
  const rows = data.map((row, rowIndex) => (
    <Table.Tr key={rowIndex} style={{ cursor: 'pointer' }}>
      {columns.map((column) => (
        <Table.Td key={column.key} style={{ padding: '8px' }}>
          {row[column.key]}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Card shadow="md"  radius="md" w="100%" mt={20} >
      <Title mb={20} order={3}>{title}</Title>
      <ScrollArea h={200}>
      <Table highlightOnHover  >
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th key={column.key} style={{ textAlign: 'left', padding: '8px' }}>
                {column.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      </ScrollArea>
    </Card>
  );
};

export default DataTable;
function handleLoadingAndError(loadingStates: boolean[], errors: (Error | null)[]) {
  if (loadingStates.some(loading => loading)) {
    return <div>Loading data...</div>;
  }

  for (const error of errors) {
    if (error) {
      return <div>Error loading data: {error.message}</div>;
    }
  }

  return null;
}
