import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Flex, Image, Text, VStack, Icon } from '@chakra-ui/react';
import { FaChartBar, FaHistory, FaBook, FaCog, FaPhone } from 'react-icons/fa';

const logoUrl =
  'https://your-logo-url.com';

export function CRperSource() {
  return (
    <Flex w="100%" h="100vh" p={4} bg="gray.100" borderRadius="lg" justifyContent="space-between">
      <Box w="15%" bg="white" borderRadius="md" p={4} boxShadow="md" display="flex" flexDirection="column">
        <Image src={logoUrl} alt="Company Logo" w="75%" mx="auto" mb={4} />

        <Box bg="red" borderRadius="md" p={2} textAlign="center" color="white" mb={4}>
          <Text fontSize="xl">Dashboard</Text>
        </Box>

        <VStack spacing={2} align="center" flex="1">
          <Link display="flex" alignItems="center">
            <Icon as={FaChartBar} />
            <Text>Bar Chart</Text>
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
            <Icon as={FaPhone} />
            <Text>Contact us</Text>
          </Link>
        </VStack>
      </Box>

      <Box w="70%" bg="white" borderRadius="md" p={4} boxShadow="md">
        <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
      </Box>

      <Box w="15%" bg="white" borderRadius="md" p={4} boxShadow="md">
        <Text fontSize="lg">Right Side Content</Text>
        <p>Achtung, santier de constructii.</p>
      </Box>
    </Flex>
  );
}

export default CRperSource;
