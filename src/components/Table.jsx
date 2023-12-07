import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

export function CustomTable() {
  const [data, setData] = useState([]);
  const [sortDirection, setSortDirection] = useState({ col2: 'none', col3: 'none', col4: 'none' });

  useEffect(() => {
    axios.get('https://sleepy-pond-18261.pktriot.net/api/mainmenu')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const sortData = (column) => {
    const direction = sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortDirection({ ...sortDirection, [column]: direction });
  };

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
              <Th onClick={() => sortData('avg_contribution_rate_09')}>
                <Text textAlign="center" style={{ cursor: 'pointer' }}>Contribution Rate (Last Month)</Text>
              </Th>
              <Th onClick={() => sortData('percentage_difference_09_vs_08')}>
                <Text textAlign="center" style={{ cursor: 'pointer' }}>Month vs Month</Text>
              </Th>
              <Th onClick={() => sortData('percentage_difference_Q3_vs_Q2')}>
                <Text textAlign="center" style={{ cursor: 'pointer' }}>Quarter vs Quarter</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Text textAlign="center">
                    {/* Use the Link component to navigate to individual Dashboards */}
                    <Link to={`/dashboard/${row.client_id}`}>{row.client_id}</Link>
                  </Text>
                </Td>
                <Td>
                  <Text textAlign="center">
                    {row.avg_contribution_rate_09 !== null
                      ? row.avg_contribution_rate_09.toFixed(2)
                      : 'N/A'}
                  </Text>
                </Td>
                <Td>
                  <Text textAlign="center" style={{ color: row.percentage_difference_09_vs_08 <= 0 || row.percentage_difference_09_vs_08 === null ? 'red' : 'green' }}>
                    {row.percentage_difference_09_vs_08 !== null
                      ? `${row.percentage_difference_09_vs_08.toFixed(2)}% ${row.percentage_difference_09_vs_08 <= 0 || row.percentage_difference_09_vs_08 === null ? '↓' : '↑'}`
                      : 'N/A'}
                  </Text>
                </Td>
                <Td>
                  <Text textAlign="center" style={{ color: row.percentage_difference_Q3_vs_Q2 <= 0 || row.percentage_difference_Q3_vs_Q2 === null ? 'red' : 'green' }}>
                    {row.percentage_difference_Q3_vs_Q2 !== null
                      ? `${row.percentage_difference_Q3_vs_Q2.toFixed(2)}% ${row.percentage_difference_Q3_vs_Q2 <= 0 || row.percentage_difference_Q3_vs_Q2 === null ? '↓' : '↑'}`
                      : 'N/A'}
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
