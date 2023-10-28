import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function DashboardMiddle() {
  const quarterData = {
    "Q1": [73, 63, 60, 40, 49, 46, 38, 63, 53, 45, 49, 64],
    "Q2": [45, 39, 30, 35, 48, 36, 48, 49, 47, 39, 41, 40],
    "Q3": [6, 4, 39, 60, 46, 54, 56, 42, 52, 33, 37, 38],
    "Q4": [29, 7, 23, 21],
  };

  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  const [chartData, setChartData] = useState(quarterData[selectedQuarter]);

  const handleQuarterChange = (e) => {
    const selectedQuarter = e.target.value;
    setSelectedQuarter(selectedQuarter);
  };

  // Update the chartData when selectedQuarter changes
  useEffect(() => {
    setChartData(quarterData[selectedQuarter]);
  }, [selectedQuarter]);

  const weeks = Array.from({ length: 12 }, (_, index) => `Week ${index + 1}`);
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
        <Link to="/dashboard">
          <div style={{ backgroundColor: '#e01c4c', flex: '1', height: '50px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', padding: '10px' }}>
            <p>Contribution Rate, %</p>
          </div>
        </Link>
        <div style={{ width: '20px' }}></div>
        <Link to="/crpersource">
          <div style={{ backgroundColor: '#e01c4c', flex: '1', height: '50px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', padding: '10px' }}>
            <p>CR per Source</p>
          </div>
        </Link>
        <div style={{ width: '20px' }}></div>
        <Link to="/monthovermonth">
          <div style={{ backgroundColor: '#e01c4c', flex: '1', height: '50px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', padding: '10px' }}>
            <p>Month over Month</p>
          </div>
        </Link>
        <div style={{ width: '20px' }}></div>
        <Link to="/quarteroverquarter">
          <div style={{ backgroundColor: '#e01c4c', flex: '1', height: '50px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', padding: '10px' }}>
            <p>Quarter over Quarter</p>
          </div>
        </Link>
      </div>

      <HighchartsReact highcharts={Highcharts} options={options} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <select value={selectedQuarter} onChange={handleQuarterChange} style={{ width: '200px' }}>
          <option value="Q1">Quarter 1</option>
          <option value="Q2">Quarter 2</option>
          <option value="Q3">Quarter 3</option>
          <option value="Q4">Quarter 4</option>
        </select>
      </div>
    </div>
  );
}

export default DashboardMiddle;
