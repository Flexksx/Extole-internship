import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function ContributionChart() {
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Contribution Rate Chart',
    },
    // Add your Highcharts configuration options here.
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ContributionChart;
