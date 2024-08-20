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
