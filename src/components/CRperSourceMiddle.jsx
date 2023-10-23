import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function CRperSourceMiddle() {
  const weeks = Array.from({ length: 15 }, (_, index) => `Source ${index + 1}`);
  const options = {
    chart: {
      type: 'bar',
      height: '60%', // Adjust the height to make it larger
    },
    title: {
      text: 'Attributed per Source: ',
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
        data: [20, 30, 25, 40, 45, 50, 60, 70, 65, 55, 50, 45],
        color: '#e01c4c',
      },
    ],
  };

  const [selectedQuarter, setSelectedQuarter] = useState('Quarter 1');

  const handleQuarterChange = (e) => {
    setSelectedQuarter(e.target.value);
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
