import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function AttributionChart() {
  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Attribution Rate',
    },
    plotOptions: {
      pie: {
        size: '30%', // Set the size to a smaller value, adjust as needed
      },
    },
    series: [
      {
        name: 'Attribution Rate',
        data: [
          {
            name: 'Attributed',
            y: 60, // Adjust the percentage as needed
          },
          {
            name: 'Unattributed',
            y: 40, // Adjust the percentage as needed
          },
        ],
      },
    ],
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}
