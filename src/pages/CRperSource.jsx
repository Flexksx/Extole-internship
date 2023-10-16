import React from 'react';
import { Box, Flex, Image, Text, VStack, Link, Icon } from '@chakra-ui/react';
import { FaChartBar, FaHistory, FaBook, FaCog, FaPhone } from 'react-icons/fa';

const logoUrl =
  'https://4a71b5761700fa86bf84.cdn6.editmysite.com/uploads/b/4a71b5761700fa86bf842ad62ae8665c4f535d423548ebe8cdacd81778f0713f/Extole-logo_large-copy_1656441979.png?width=800&optimize=medium';

export function CRperSource() {
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
            <Icon as={FaChartBar} />
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
            <Icon as={FaPhone} />
            <Text>Contact us</Text>
          </Link>
        </VStack>
      </Box>

      <Box w="70%" bg="white" borderRadius="md" p={4} boxShadow="md">
        {/* Add your content for the center section here, e.g., BarChart */}
        {/* Replace this comment with your BarChart component */}
      </Box>

      <Box w="15%" bg="white" borderRadius="md" p={4} boxShadow="md" display="flex" flexDirection="column">
        <Text fontSize="xl" textAlign="center">More</Text>
        {/* Add your content for the right menu here */}
      </Box>
    </Flex>
  );
}

export default CRperSource;
