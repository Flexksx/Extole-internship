import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getClientDataByQuarter } from '../services/apiService'; 
import { getWeeklyData } from '../services/apiService';
import { useParams } from 'react-router-dom';
import { Select, Flex, Text } from '@chakra-ui/react';

export function MonthOverMonthMiddle() {
  const { clientId } = useParams();
  const [selectedMonth1, setSelectedMonth1] = useState('January');
  const [selectedMonth2, setSelectedMonth2] = useState('February');
  const [chartData1, setChartData1] = useState([]);
  const [chartData2, setChartData2] = useState([]);

  const handleMonthChange1 = (e) => {
    setSelectedMonth1(e.target.value);
  };

  const handleMonthChange2 = (e) => {
    setSelectedMonth2(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const allData = await getWeeklyData();
        const clientData = allData.filter(data => data.client_id.toString() === clientId);

        const mapMonthToWeeks = (month) => {
          const monthMapping = {
            January: [1, 2, 3, 4],
            February: [5, 6, 7, 8],
            March: [9, 10, 11, 12],
            April: [13, 14, 15, 16],
            May: [17, 18, 19, 20],
            June: [21, 22, 23, 24, 25],
            July: [26, 27, 28, 29],
            August: [30, 31, 32, 33, 34],
            September: [35, 36, 37, 38]
          };
          return monthMapping[month];
        };

        const getDataForMonth = (month) => {
          const weeks = mapMonthToWeeks(month);
          return clientData
            .filter(weekData => weeks.includes(weekData.week))
            .map(weekData => weekData.contribution_rate);
        };

        setChartData1(getDataForMonth(selectedMonth1));
        setChartData2(getDataForMonth(selectedMonth2));
      } catch (error) {
        console.error("Failed to fetch weekly data for client", error);
      }
    }

    fetchData();
  }, [clientId, selectedMonth1, selectedMonth2]);

  const options = {
    chart: {
      type: 'line',
      height: '60%',
    },
    title: {
      text: 'Contribution Rate Month over Month',
      align: 'left',
    },
    xAxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    },
    yAxis: {
      title: {
        text: 'Contribution Rate',
      },
    },
    series: [
      {
        name: `CR, % (${selectedMonth1})`,
        data: chartData1,
        color: "#e01c4c",
      },
      {
        name: `CR, % (${selectedMonth2})`,
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
  <Select value={selectedMonth1} onChange={handleMonthChange1} width="200px">
    <option value="January">January</option>
    <option value="February">February</option>
    <option value="March">March</option>
    <option value="April">April</option>
    <option value="May">May</option>
    <option value="June">June</option>
    <option value="July">July</option>
    <option value="August">August</option>
    <option value="September">September</option>
  </Select>
  <Select value={selectedMonth2} onChange={handleMonthChange2} width="200px" marginLeft="20px">
    <option value="January">January</option>
    <option value="February">February</option>
    <option value="March">March</option>
    <option value="April">April</option>
    <option value="May">May</option>
    <option value="June">June</option>
    <option value="July">July</option>
    <option value="August">August</option>
    <option value="September">September</option>
  </Select>
</Flex>

      </div>
  );
}

export default MonthOverMonthMiddle;
