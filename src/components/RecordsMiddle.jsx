import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getClientDataByQuarter } from '../services/apiService'; 
import { getWeeklyData } from '../services/apiService';
import { useParams } from 'react-router-dom';
import { Select, Flex } from '@chakra-ui/react';

export function RecordsMiddle() {
  const { clientId } = useParams();
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  const [chartData, setChartData] = useState([]);

  const handleQuarterChange = (e) => {
    setSelectedQuarter(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all weekly data
        const allData = await getWeeklyData();
        // Filter for the current client ID and selected quarter
        const clientWeeklyData = allData.filter(data => data.client_id.toString() === clientId);
        const startWeek = (parseInt(selectedQuarter[1]) - 1) * 13;
        const endWeek = startWeek + 13;
        const clientQuarterData = clientWeeklyData.filter(data => data.week >= startWeek && data.week < endWeek);
        setChartData(clientQuarterData.map(item => item.contribution_rate));
      } catch (error) {
        console.error("Failed to fetch weekly data for client", error);
      }
    }

    fetchData();
  }, [clientId, selectedQuarter]);

  const weeks = Array.from({ length: 38 }, (_, index) => `Week ${index + 1}`);
  const options = {
    chart: {
      type: 'line',
      height: '60%',
    },
    title: {
      text: 'Contribution Rate for the client',
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
        name: 'CR, %',
        data: chartData,
        color: "#e01c4c",
      },
    ],
  };


  return (
    <div style={{ height: '100%', padding: '10px' }}>
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
          <div style={{ backgroundColor: 'grey', flex: '1', height: '50px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', padding: '10px' }}>
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

export default RecordsMiddle;
