import React from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Link,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { FaChartLine, FaHistory, FaBook, FaCog, FaBars, FaPhone, FaUser } from 'react-icons/fa';
import { CRperSourceMiddle, DashboardMiddle } from '../components';
import { Link as RouterLink } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const logoUrl =
  'https://4a71b5761700fa86bf84.cdn6.editmysite.com/uploads/b/4a71b5761700fa86bf842ad62ae8665c4f535d423548ebe8cdacd81778f0713f/Extole-logo_large-copy_1656441979.png?width=800&optimize=medium';

// Define the pie chart options
const pieChartOptions = {
  chart: {
    type: 'pie',
    backgroundColor: '#d3d3d3',
  },
  title: {
    text: 'Attribution Rate',
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: false, // Disable data labels (category names)
      },
      showInLegend: true, // Show legend to indicate categories instead
    },
  },
  series: [
    {
      name: 'Categories',
      colorByPoint: true,
      data: [
        {
          name: 'Unattributed',
          y: 10, // Add your data for Unattributed here
        },
        {
          name: 'Attributed',
          y: 20, // Add your data for Attributed here
        },
      ],
    },
  ],
};

export function CRperSource() {
  return (
    <Flex
      w="100%"
      h="100vh"
      p={4}
      bg="grey"
      borderRadius="lg"
      justifyContent="space-between"
    >
      <Box w="15%" bg="#d3d3d3" borderRadius="md" p={4} boxShadow="md" display="flex" flexDirection="column">
        <Image src={logoUrl} alt="Company Logo" w="75%" mx="auto" mb={4} />

        <Box
          bg="red"
          borderRadius="md"
          p={2}
          textAlign="center"
          color="white"
          mb={4}
        >
          <Text fontSize="xl">Dashboard</Text>
        </Box>

        <VStack spacing={4} align="center" flex="1" mb={4}>
          <Link display="flex" alignItems="center">
            <Icon as={FaChartLine} />
            <Text>Analytics</Text>
          </Link>
          <Link display="flex" alignItems="center">
            <Icon as={FaHistory} />
            <Text>History</Text>
          </Link>
          <Link display="flex" alignItems="center">
            <Icon as={FaBook} />
            <Text>Records</Text>
          </Link>
        </VStack>

        <VStack spacing={2} mb={4} mt="auto">
          <Link display="flex" alignItems="center">
            <Icon as={FaCog} />
            <Text>Settings</Text>
          </Link>
          <Link display="flex" alignItems="center">
            <HStack>
              <Icon as={FaPhone} />
              <Text>Contact Us</Text>
            </HStack>
          </Link>
        </VStack>
      </Box>

      <Box w="65%" bg="white" borderRadius="md" p={4} boxShadow="md" mb={4}>
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={4}>
          Dashboard Title
        </Text>
        <CRperSourceMiddle />
      </Box>

      <Box w="20%" bg="#d3d3d3" borderRadius="md" p={4} boxShadow="md" display="flex" flexDirection="column">
        <Text fontSize="xl" textAlign="center">More</Text>
        <VStack spacing={4} mt={4}>
          <Link as={RouterLink} to="/profile">
            <HStack>
              <Icon as={FaUser} />
              <Text>Profile</Text>
            </HStack>
          </Link>
          <Link as={RouterLink} to="/">
            <HStack>
              <Icon as={FaBars} />
              <Text>Menu</Text>
            </HStack>
          </Link>
          <Box w="100%" paddingBottom="100%" position="relative">
            <HighchartsReact highcharts={Highcharts} options={pieChartOptions} containerProps={{ style: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 } }} />
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}

export default CRperSource;
