import React from 'react';
import { Box, Flex, Image, Text, VStack, Link, Icon } from '@chakra-ui/react';
import { FaChartLine, FaHistory, FaBook, FaCog, FaPhone } from 'react-icons/fa';
import {ContributionChart }from '../components'; // Import ContributionChart

const logoUrl =
  'https://4a71b5761700fa86bf84.cdn6.editmysite.com/uploads/b/4a71b5761700fa86bf842ad62ae8665c4f535d423548ebe8cdacd81778f0713f/Extole-logo_large-copy_1656441979.png?width=800&optimize=medium';

export function Dashboard() {
  return (
    <Flex
      w="100%"
      h="100vh"
      p={4}
      bg="gray.100"
      borderRadius="lg"
      justifyContent="space-between"
    >
      <Box w="15%" bg="white" borderRadius="md" p={4} boxShadow="md" display="flex" flexDirection="column">
        <Image src={logoUrl} alt="Company Logo" w="75%" mx="auto" mb={4} />

        <Box
          bg="red.500"
          borderRadius="md"
          p={2}
          textAlign="center"
          color="white"
          mb={4}
        >
          <Text fontSize="xl">Dashboard</Text>
        </Box>

        <VStack spacing={2} align="center" flex="1">
          <Link display="flex" alignItems="center">
            <Icon as={FaChartLine} />
            <Text pl={2}>Analytics</Text> {/* Add padding to the left of the text */}
          </Link>
          <Link display="flex" alignItems="center">
            <Icon as={FaHistory} />
            <Text pl={2}>History</Text> {/* Add padding to the left of the text */}
          </Link>
          <Link display="flex" alignItems="center">
            <Icon as={FaBook} />
            <Text pl={2}>Records</Text> {/* Add padding to the left of the text */}
          </Link>
        </VStack>
        
        <VStack spacing={2} mb={4} mt="auto">
          <Link display="flex" alignItems="center">
            <Icon as={FaCog} />
            <Text pl={2}>Settings</Text> {/* Add padding to the left of the text */}
          </Link>
          <Link display="flex" alignItems="center">
            <Icon as={FaPhone} />
            <Text pl={2}>Contact us</Text> {/* Add padding to the left of the text */}
          </Link>
        </VStack>
      </Box>

      <Box w="70%" bg="white" borderRadius="md" p={4} boxShadow="md">
        {/* Add your content for the center section here, e.g., ContributionChart */}
        <ContributionChart />
      </Box>

      <Box w="15%" bg="white" borderRadius="md" p={4} boxShadow="md">
        {/* Add your content for the right section here */}
        {/* Placeholder content for the right side */}
        <Text fontSize="lg">Right Side Content</Text>
        <p>This is where you can include additional information or widgets relevant to your application.</p>
      </Box>
    </Flex>
  );
}

export default Dashboard;