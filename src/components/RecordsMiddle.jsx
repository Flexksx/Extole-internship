import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getWeeklyData, getClientSourcesByQuarter } from '../services/apiService';

export function RecordsMiddle() {
  const { clientId } = useParams();
  const [topWeeksData, setTopWeeksData] = useState([]);
  const [topSourcesData, setTopSourcesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const getQuarterAndWeek = (weekNumber) => {
          if (weekNumber <= 12) {
            return `Quarter 1 Week ${weekNumber}`;
          } else if (weekNumber <= 25) {
            return `Quarter 2 Week ${weekNumber - 12}`;
          } else {
            return `Quarter 3 Week ${weekNumber - 25}`;
          }
        };
        let aggregatedSources = {};
        for (const quarter of ['Q1', 'Q2', 'Q3']) {
          const quarterData = await getClientSourcesByQuarter(clientId, quarter);
          quarterData.forEach(({ source, customers }) => {
            aggregatedSources[source] = (aggregatedSources[source] || 0) + customers;
          });
        }
        const allWeeklyData = await getWeeklyData();
        const clientWeeklyData = allWeeklyData.filter(data => data.client_id.toString() === clientId);
        const sortedWeeks = clientWeeklyData
          .sort((a, b) => b.contribution_rate - a.contribution_rate)
          .slice(0, 10)
          .map(week => ({
            week: getQuarterAndWeek(week.week),
            contributionRate: week.contribution_rate
          }));

        setTopWeeksData(sortedWeeks);
        const sortedSources = Object.entries(aggregatedSources)
          .map(([source, customers]) => ({ source, customers }))
          .sort((a, b) => b.customers - a.customers)
          .slice(0, 10);

        setTopSourcesData(sortedSources);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }

    fetchData();
  }, [clientId]);

  const weeksChartOptions = {
    chart: {
      type: 'column',
      height: '43%'
    },
    title: {
      text: 'Top Weeks by Contribution Rate'
    },
    xAxis: {
      categories: topWeeksData.map(data => data.week),
      title: {
        text: 'Quarter/Week'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Contribution Rate (%)'
      }
    },
    series: [{
      name: 'Contribution Rate',
      data: topWeeksData.map(data => data.contributionRate),
      color: "#e01c4c"
    }]
  };

  const sourcesChartOptions = {
    chart: {
      type: 'column',
      height: '43%'
    },
    title: {
      text: 'Top Sources by Number of Customers'
    },
    xAxis: {
      categories: topSourcesData.map(data => data.source),
      title: {
        text: 'Source'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Customers'
      }
    },
    series: [{
      name: 'Customers',
      data: topSourcesData.map(data => data.customers),
      color: "#e01c4c"
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={weeksChartOptions} />
      <HighchartsReact highcharts={Highcharts} options={sourcesChartOptions} />
    </div>
  );
}

export default RecordsMiddle;
