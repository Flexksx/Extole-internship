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
import { DashboardMiddle } from '../components';
import { Link as RouterLink } from 'react-router-dom';
import { AttributionChart } from '../components';

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
          bg="red"
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

      <Box w="70%" bg="white" borderRadius="md" p={4} boxShadow="md">
        <DashboardMiddle />
      </Box>

      <Box w="15%" bg="white" borderRadius="md" p={4} boxShadow="md" display="flex" flexDirection="column">
        <Text fontSize="xl" textAlign="center">More</Text>
        <VStack spacing={4} mt={4}>
          <Link as={RouterLink} to="/profile">
            <HStack>
              <Icon as={FaUser} /> {/* Use an appropriate icon for "Profile" */}
              <Text>Profile</Text>
            </HStack>
          </Link>
          <Link as={RouterLink} to="/">
            <HStack>
              <Icon as={FaBars} /> {/* Use an appropriate icon for "Menu" */}
              <Text>Menu</Text>
            </HStack>
          </Link>
          <AttributionChart />
        </VStack>
      </Box>
    </Flex>
  );
}

export default Dashboard;