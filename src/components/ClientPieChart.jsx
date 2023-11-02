import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getWeeklyData } from '../services/apiService';

export function ClientPieChart({ clientId }) {
    const [pieChartData, setPieChartData] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const allData = await getWeeklyData(); // Fetch all weekly data
            const clientData = allData.filter(item => item.client_id.toString() === clientId);
    
            const attributedTotal = clientData.reduce((sum, record) => sum + record.attributed, 0);
            const unattributedTotal = clientData.reduce((sum, record) => sum + record.unattributed, 0);
    
            setPieChartData([
              { name: 'Attributed', y: attributedTotal, color: "#e94f38" },
              { name: 'Unattributed', y: unattributedTotal, color: "#e01c4c" }
            ]);
          } catch (error) {
            console.error("Failed to fetch weekly data for the pie chart", error);
          }
        }
    
        fetchData();
      }, [clientId]);

  // Pie chart options
  const pieChartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'white',
    },
    title: {
      text: 'Attribution Rate for All Quarters',
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Attribution',
        colorByPoint: true,
        data: pieChartData,
      },
    ],
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
  );
};

export default ClientPieChart;
