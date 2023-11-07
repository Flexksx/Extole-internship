import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Select, Flex, Text } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getClientSourcesByQuarter } from '../services/apiService';

export function CRperSourceMiddle() {
  const weeks = Array.from({ length: 15 }, (_, index) => `Source ${index + 1}`);
  const { clientId } = useParams();
  const [sourceNames, setSourceNames] = useState([]);
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  const [chartData, setChartData] = useState([]);

  const handleQuarterChange = (e) => {
    setSelectedQuarter(e.target.value);
  };

  useEffect(() => {
    async function fetchData(quarter) {
      try {
        const sourcesData = await getClientSourcesByQuarter(clientId, quarter);
        const customersBySource = sourcesData.reduce((acc, { source, customers }) => {
          acc[source] = (acc[source] || 0) + customers;
          return acc;
        }, {});

        const chartDataPrepared = Object.entries(customersBySource).map(([source, totalCustomers]) => ({
          name: source,
          y: totalCustomers
        }));

        setChartData(chartDataPrepared);
        setSourceNames(chartDataPrepared.map(data => data.name));
      } catch (error) {
        console.error("Failed to fetch source data for client", error);
      }
    }

    fetchData(selectedQuarter);
  }, [clientId, selectedQuarter]);

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: `Customer Count per Source for Client`,
    },
    xAxis: {
      categories: sourceNames,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total Number of Customers',
      },
    },
    series: [{
      name: 'Customers',
      data: chartData,
      color: "#e01c4c",
    }],
  };

  

  return (
    <div style={{ height: '100%', padding: '10px' }}>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={4}>
          Dashboard: {clientId} 
        </Text>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingTop: '10px' }}>
      <Link to={`/dashboard/${clientId}`}>
          <div style={{ backgroundColor: '#e01c4c', flex: '1', height: '50px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', padding: '10px' }}>
            <p>Contribution Rate, %</p>
          </div>
        </Link>
        <div style={{ width: '20px' }}></div>
        <Link to={`/crpersource/${clientId}`}>
          <div style={{ backgroundColor: '#e01c4c', flex: '1', height: '50px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', padding: '10px' }}>
            <p>CR per Source</p>
          </div>
        </Link>
        <div style={{ width: '20px' }}></div>
        <Link to={`/monthovermonth/${clientId}`}>
          <div style={{ backgroundColor: 'grey', flex: '1', height: '50px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', padding: '10px' }}>
            <p>Month over Month</p>
          </div>
        </Link>
        <div style={{ width: '20px' }}></div>
        <Link to={`/quarteroverquarter/${clientId}`}>
          <div style={{ backgroundColor: '#e01c4c', flex: '1', height: '50px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', padding: '10px' }}>
            <p>Quarter over Quarter</p>
          </div>
        </Link>
      </div>

      <HighchartsReact highcharts={Highcharts} options={options} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Flex width="200px">
          <Select 
            // placeholder="Select quarter"
            value={selectedQuarter}
            onChange={handleQuarterChange}
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.400' }}
            _focus={{ borderColor: 'e01c4c', boxShadow: `0 0 0 1px #e01c4c` }}
          >
            <option value="Q1">Quarter 1</option>
            <option value="Q2">Quarter 2</option>
            <option value="Q3">Quarter 3</option>
            {/* <option value="Q4">Quarter 4</option> */}
          </Select>
        </Flex>
      </div>
    </div>
  );
}

export default CRperSourceMiddle;
