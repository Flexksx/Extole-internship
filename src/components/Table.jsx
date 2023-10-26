import React from 'react';
import { Link } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react';

export function CustomTable() {
  const data = [
    { id: 123, contributionRate: 45, monthVsMonth: 10, quarterVsQuarter: -5 },
    { id: 456, contributionRate: 72, monthVsMonth: -15, quarterVsQuarter: 20 },
  ];

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
            {data.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Text textAlign="center">
                    {index > 0 ? (
                      <Link to="/dashboard">{row.id}</Link>
                    ) : (
                      row.id
                    )}
                  </Text>
                </Td>
                <Td>
                  <Text textAlign="center">{row.contributionRate}</Text>
                </Td>
                <Td>
                  <Text
                    textAlign="center"
                    color={row.monthVsMonth > 0 ? 'green' : 'red'}
                  >
                    {row.monthVsMonth > 0 ? `+${row.monthVsMonth}% ↑` : `${row.monthVsMonth}% ↓`}
                  </Text>
                </Td>
                <Td>
                  <Text
                    textAlign="center"
                    color={row.quarterVsQuarter > 0 ? 'green' : 'red'}
                  >
                    {row.quarterVsQuarter > 0 ? `+${row.quarterVsQuarter}% ↑` : `${row.quarterVsQuarter}% ↓`}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
