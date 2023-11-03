import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Link,
  Icon,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Center,
} from '@chakra-ui/react';
import { FaChartLine, FaHistory, FaBook, FaCog, FaBars, FaPhone, FaUser } from 'react-icons/fa';
import { CRperSourceMiddle, ClientPieChart } from '../components';
import { Link as RouterLink } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const logoUrl =
  'https://4a71b5761700fa86bf84.cdn6.editmysite.com/uploads/b/4a71b5761700fa86bf842ad62ae8665c4f535d423548ebe8cdacd81778f0713f/Extole-logo_large-copy_1656441979.png?width=800&optimize=medium';

export function CRperSource() {
  const { clientId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      w="100%"
      h="100vh"
      p={4}
      bg="#dbbaba"
      borderRadius="lg"
      justifyContent="space-between"
    >
      <Box w="15%" bg="white" borderRadius="md" p={4} boxShadow="md" display="flex" flexDirection="column">
        <Image src={logoUrl} alt="Company Logo" w="75%" mx="auto" mb={4} />

        <Box
          bg="#e01c4c"
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
            <Icon as={FaChartLine} color = "grey"/>
            <Text color = "grey">Analytics</Text>
          </Link>
          <Link display="flex" alignItems="center">
            <Icon as={FaHistory} color = "grey"/>
            <Text color = "grey">History</Text>
          </Link>
          <Link display="flex" alignItems="center">
            <Icon as={FaBook} color = "grey"/>
            <Text color = "grey">Records</Text>
          </Link>
        </VStack>

        <VStack spacing={2} mb={4} mt="auto">
          <Link display="flex" alignItems="center">
            <Icon as={FaCog} color = "grey"/>
            <Text color = "grey">Settings</Text>
          </Link>
          <Link display="flex" alignItems="center" onClick={onOpen}>
        <HStack>
          <Icon as={FaPhone} />
          <Text>Contact Us</Text>
        </HStack>
      </Link>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Contact Information</ModalHeader>
          <ModalBody>
            <Center>
            <Text>
              <div>Phone: 123-456-7890</div>
              <div>Email: contact@example.com</div>
            </Text>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Center w="full">
              <Button colorScheme="red" bg="#e01c4c" mr={3} onClick={onClose}>
                Close
              </Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </VStack>
      </Box>

      <Box w="65%" bg="white" borderRadius="md" p={4} boxShadow="md" mb={4}>
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={4}>
          Dashboard: {clientId}
        </Text>
        <CRperSourceMiddle clientId={clientId} />
      </Box>

      <Box w="20%" bg="white" borderRadius="md" p={4} boxShadow="md" display="flex" flexDirection="column">
        <Text fontSize="3xl" textAlign="center" fontWeight="bold">More</Text>
        <VStack spacing={4} mt={4}>
          <Link as={RouterLink} to="/profile">
            <HStack>
              <Icon as={FaUser} color = "grey"/>
              <Text color = "grey">Profile</Text>
            </HStack>
          </Link>
          <Link as={RouterLink} to="/">
            <HStack>
              <Icon as={FaBars} />
              <Text>Menu</Text>
            </HStack>
          </Link>
          <Box w="100%" paddingBottom="100%" position="relative">
          <ClientPieChart clientId={clientId} />
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}

export default CRperSource;
