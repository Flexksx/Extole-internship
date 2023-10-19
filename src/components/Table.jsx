// components/Table.js
import React from 'react';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
} from '@chakra-ui/react';

export function CustomTable() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src="https://4a71b5761700fa86bf84.cdn6.editmysite.com/uploads/b/4a71b5761700fa86bf842ad62ae8665c4f535d423548ebe8cdacd81778f0713f/Extole-logo_large-copy_1656441979.png?width=800&optimize=medium"
        alt="Extole Logo"
        width="200"
      />
      <TableContainer w="80%" mt="20px">
  <Table variant="striped" borderWidth="2px">
    <TableCaption>Extole 2023</TableCaption>
    <Thead>
      <Tr>
        <Th>
          <Text textAlign="center">Client ID</Text>
        </Th>
        <Th>
          <Text textAlign="center">Contribution Rate</Text>
        </Th>
        <Th>
          <Text textAlign="center">Month vs Month</Text>
        </Th>
        <Th>
          <Text textAlign="center">Quarter vs Quarter</Text>
        </Th>
      </Tr>
    </Thead>
    <Tbody>
    </Tbody>
  </Table>
</TableContainer>

    </div>
  );
}

export default CustomTable;
