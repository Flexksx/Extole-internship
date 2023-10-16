import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { VStack, Link, Icon, Text } from '@chakra-ui/react';
import { FaBell, FaUser, FaBars } from 'react-icons/fa'; // Import the required icons

export function AttributionChart() {
  const options = {
    chart: {
      type: 'pie',
      height: 300, // Set the height of the chart
    },
    title: {
      text: 'Attribution',
      align: 'center',
    },
    series: [
      {
        name: 'Attribution',
        data: [
          { name: 'Attributed', y: 20 },
          { name: 'Unattributed', y: 30 },
        ],
      },
    ],
  };

  return (
    <div>
        {/* Wrap the title and links in a VStack with padding */}
      <VStack spacing={4} align="center" p={4}>

        {/* Add links or other content here */}
        <Link display="flex" alignItems="center">
          <Icon as={FaBell} />
          <Text>Notifications</Text>
        </Link>
        <Link display="flex" alignItems="center">
          <Icon as={FaUser} />
          <Text>Profile</Text>
        </Link>
        <Link display="flex" alignItems="center" to="./"> {/* Set the 'to' attribute to the path of your 'App' component */}
          <Icon as={FaBars} />
          <Text>Menu</Text>
        </Link>

      </VStack>

      {/* The pie chart remains as it is */}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default AttributionChart;
