import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getClientSourcesByQuarter, getWeeklyData } from '../services/apiService';

export function RecordsMiddle() {
  const { clientId } = useParams();
  const [topWeeksData, setTopWeeksData] = useState([]);
  const [topSourcesData, setTopSourcesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let aggregatedSources = {};
        let weeklyData = [];

        // Fetch data for all three quarters and aggregate the results
        for (const quarter of ['Q1', 'Q2', 'Q3']) {
          const quarterData = await getClientSourcesByQuarter(clientId, quarter);
          quarterData.forEach(({ source, customers }) => {
            aggregatedSources[source] = (aggregatedSources[source] || 0) + customers;
          });
        }

        // Fetch weekly data and filter by client ID
        const allWeeklyData = await getWeeklyData();
        weeklyData = allWeeklyData.filter(data => data.client_id.toString() === clientId);

        // Sort and slice the top 10 sources
        const sortedSources = Object.entries(aggregatedSources)
          .map(([source, customers]) => ({ source, customers }))
          .sort((a, b) => b.customers - a.customers)
          .slice(0, 10);

        // Sort and slice the top 10 weeks by contribution rate
        const sortedWeeks = weeklyData
          .sort((a, b) => b.contribution_rate - a.contribution_rate)
          .slice(0, 10)
          .map(week => ({
            week: `Week ${week.week}`,
            contributionRate: week.contribution_rate
          }));

        setTopWeeksData(sortedWeeks);
        setTopSourcesData(sortedSources);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }

    fetchData();
  }, [clientId]);

  const weeksChartOptions = {
    chart: { type: 'column' , height: "40%"},
    title: { text: 'Top Weeks by Contribution Rate' },
    xAxis: {
      categories: topWeeksData.map(data => data.week),
      title: { text: 'Week' }
    },
    yAxis: {
      min: 0,
      title: { text: 'Contribution Rate (%)' }
    },
    series: [{
      name: 'Contribution Rate',
      data: topWeeksData.map(data => data.contributionRate),
      color: "#e01c4c"
    }]
  };

  const sourcesChartOptions = {
    chart: { type: 'column' , height: "40%"},
    title: { text: 'Top Sources by Number of Customers' },
    xAxis: {
      categories: topSourcesData.map(data => data.source),
      title: { text: 'Source' }
    },
    yAxis: {
      min: 0,
      title: { text: 'Number of Customers' }
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
