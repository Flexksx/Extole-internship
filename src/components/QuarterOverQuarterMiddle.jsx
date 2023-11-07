import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getWeeklyData } from '../services/apiService';
import { Flex, Select, Text } from '@chakra-ui/react';

export function QuarterOverQuarterMiddle() {
  const { clientId } = useParams();
  const [selectedQuarter1, setSelectedQuarter1] = useState('Q1');
  const [selectedQuarter2, setSelectedQuarter2] = useState('Q2');
  const [chartData1, setChartData1] = useState([]);
  const [chartData2, setChartData2] = useState([]);

  const handleQuarterChange1 = (e) => {
    setSelectedQuarter1(e.target.value);
  };

  const handleQuarterChange2 = (e) => {
    setSelectedQuarter2(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const allData = await getWeeklyData();

        const filterDataForQuarter = (data, quarter) => {
          const startWeek = quarter === 'Q1' ? 1 : quarter === 'Q2' ? 13 : 26;
          const endWeek = startWeek + 12;
          return data
            .filter(week => week.week >= startWeek && week.week < endWeek)
            .map(item => item.contribution_rate);
        };

        const clientWeeklyData = allData.filter(data => data.client_id.toString() === clientId);
        
        setChartData1(filterDataForQuarter(clientWeeklyData, selectedQuarter1));
        setChartData2(filterDataForQuarter(clientWeeklyData, selectedQuarter2));
      } catch (error) {
        console.error("Failed to fetch weekly data for client", error);
      }
    }

    fetchData();
  }, [clientId, selectedQuarter1, selectedQuarter2]);

  const weeks = Array.from({ length: 12 }, (_, index) => `Week ${index + 1}`);
  const options = {
    chart: {
      type: 'line',
      height: '60%',
    },
    title: {
      text: 'Contribution Rate per Quarter',
      align: 'left',
    },
    xAxis: {
      categories: weeks,
    },
    yAxis: {
      title: {
        text: 'Contribution Rate',
      },
    },
    series: [
      {
        name: `${selectedQuarter1} CR, %`,
        data: chartData1,
        color: "#e01c4c",
      },
      {
        name: `${selectedQuarter2} CR, %`,
        data: chartData2,
        color: "black",
      },
    ],
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
          <div style={{ backgroundColor: '#e01c4c', flex: '1', height: '50px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', padding: '10px' }}>
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
      <Flex justifyContent="center" marginTop="10px">
        <Select value={selectedQuarter1} onChange={handleQuarterChange1} width="200px">
          <option value="Q1">Quarter 1</option>
          <option value="Q2">Quarter 2</option>
          <option value="Q3">Quarter 3</option>
        </Select>
        <Select value={selectedQuarter2} onChange={handleQuarterChange2} width="200px" marginLeft="20px">
          <option value="Q1">Quarter 1</option>
          <option value="Q2">Quarter 2</option>
          <option value="Q3">Quarter 3</option>
        </Select>
      </Flex>
    </div>
  );
}

export default QuarterOverQuarterMiddle;
