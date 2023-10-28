import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function CRperSourceMiddle() {
  const weeks = Array.from({ length: 15 }, (_, index) => `Source ${index + 1}`);

  const quarterData = {
    "Quarter 1": [82, 61, 51, 36, 48, 35, 25, 38, 33, 27, 28, 39],
    "Quarter 2": [26, 22, 26, 37, 27, 34, 28, 25, 19, 19, 18, 25],
    "Quarter 3": [16, 17, 22, 20, 46, 54, 56, 42, 52, 33, 37, 38],
    "Quarter 4": [48, 1, 61, 51, 36],
  };

  const [selectedQuarter, setSelectedQuarter] = useState('Quarter 1');
  const [chartData, setChartData] = useState(quarterData[selectedQuarter]);

  const handleQuarterChange = (e) => {
    setSelectedQuarter(e.target.value);
  };

  useEffect(() => {
    setChartData(quarterData[selectedQuarter]);
  }, [selectedQuarter]);

  const options = {
    chart: {
      type: 'bar',
      height: '60%',
    },
    title: {
      text: 'Attributed per Source:',
      align: 'left',
    },
    xAxis: {
      categories: weeks,
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    series: [
      {
        name: 'Attributed',
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
          <option value="Quarter 1">Quarter 1</option>
          <option value="Quarter 2">Quarter 2</option>
          <option value="Quarter 3">Quarter 3</option>
          <option value="Quarter 4">Quarter 4</option>
        </select>
      </div>
    </div>
  );
}

export default CRperSourceMiddle;
