import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function ContributionChart() {
  const weeks = Array.from({ length: 15 }, (_, index) => `Week ${index + 1}`);
  const options = {
    chart: {
      type: 'line',
      height: 400,
    },
    title: {
      text: 'Dashboard for ClientID:',
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
        name: 'ClientID 1',
        data: [20, 30, 25, 40, 45],
      },
    ],
  };

  const [selectedQuarter, setSelectedQuarter] = useState('Quarter 1');

  const handleQuarterChange = (e) => {
    setSelectedQuarter(e.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingTop: '10px' }}>
  <div style={{ backgroundColor: 'red', width: '20%', height: '150px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold' }}>
    <p>Contribution Rate, %</p>
  </div>
  <div style={{ width: '20px' }}></div>
  <div style={{ backgroundColor: 'red', width: '20%', height: '150px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold' }}>
    <p>CR per Source</p>
  </div>
  <div style={{ width: '20px' }}></div>
  <div style={{ backgroundColor: 'red', width: '20%', height: '150px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold' }}>
    <p>Month over Month</p>
  </div>
  <div style={{ width: '20px' }}></div>
  <div style={{ backgroundColor: 'red', width: '20%', height: '150px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold' }}>
    <p>Quarter over Quarter</p>
  </div>
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

export default ContributionChart;
