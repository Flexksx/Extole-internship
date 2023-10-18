import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function AttributionChart() {
  const options = {
    chart: {
      type: 'pie',
      plotBorderWidth: 0,
      plotShadow: false,
      spacing: [0, 0, 0, 0], // Adjust spacing as needed
    },
    title: {
      text: 'Attribution Rate',
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
export default AttributionChart;