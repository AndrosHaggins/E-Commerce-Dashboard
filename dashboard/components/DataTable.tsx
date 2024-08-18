import React from 'react';
import { Table, Text, Card, ScrollArea} from '@mantine/core';

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
      <Text size="lg" fw={500} style={{ marginBottom: '16px' }}>
        {title}
      </Text>
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
