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
  Switch, 
  FormControl,
  FormLabel, 
  Input,
} from '@chakra-ui/react';
import { FaChartLine, FaHistory, FaBook, FaCog, FaBars, FaPhone, FaUser } from 'react-icons/fa';
import { MonthOverMonthMiddle , ClientPieChart} from '../components';
import { Link as RouterLink } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const logoUrl =
  'https://4a71b5761700fa86bf84.cdn6.editmysite.com/uploads/b/4a71b5761700fa86bf842ad62ae8665c4f535d423548ebe8cdacd81778f0713f/Extole-logo_large-copy_1656441979.png?width=800&optimize=medium';

export function MonthOverMonth() {
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const { isOpen: isContactOpen, onOpen: onContactOpen, onClose: onContactClose } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { clientId } = useParams();
  return (
    <Flex
      w="100%"
      h="100vh"
      p={4}
      bg="#dbbaba"
      borderRadius="lg"
      justifyContent="space-between"
    >
      <Box w="15%" bg="white" borderRadius="md" p={4} boxShadow="md" display="flex" flexDirection="column" h="96vh">
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
          <RouterLink
              to={`/records/${clientId}`}
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            >
              <FaBook style={{ marginRight: '8px' }} />
              <Text>Top Contribution</Text>
            </RouterLink>
        </VStack>

        <VStack spacing={2} mb={4} mt="auto">
        <Link display="flex" alignItems="center" onClick={onSettingsOpen}>
            <HStack>
              <Icon as={FaCog} />
              <Text>Settings</Text>
            </HStack>
          </Link>

          <Link display="flex" alignItems="center" onClick={onContactOpen}>
            <HStack>
              <Icon as={FaPhone} />
              <Text>Contact Us</Text>
            </HStack>
          </Link>
        </VStack>

        <Modal isOpen={isSettingsOpen} onClose={onSettingsClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <VStack spacing={4} alignItems="flex-start">
              <Switch id="email-notifications"  size="lg" colorScheme="red"
              sx={{'.chakra-switch__track': { _checked: { bg: "#e01c4c !important",},},
              '.chakra-switch__thumb': {_checked: {  bg: "white" }, }}} >
                Email Notifications
              </Switch>

              <Switch id="email-notifications"  size="lg" colorScheme="red"
              sx={{'.chakra-switch__track': { _checked: { bg: "#e01c4c !important",},},
              '.chakra-switch__thumb': {_checked: {  bg: "white" }, }}} >
                Dashboard Updates
              </Switch>

              <Switch id="email-notifications"  size="lg" colorScheme="red"
              sx={{'.chakra-switch__track': { _checked: { bg: "#e01c4c !important",},},
              '.chakra-switch__thumb': {_checked: {  bg: "white" }, }}} >
                Some Future Features
              </Switch>

              <Switch id="email-notifications"  size="lg" colorScheme="red"
              sx={{'.chakra-switch__track': { _checked: { bg: "#e01c4c !important",},},
              '.chakra-switch__thumb': {_checked: {  bg: "white" }, }}} >
                Another Future Features
              </Switch>
              </VStack>

            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" bg="#e01c4c" mr={3} onClick={onSettingsClose}>
                Close
              </Button>
              <Button variant="ghost">Save Changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isContactOpen} onClose={onContactClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Contact Information</ModalHeader>
            <ModalBody>
              <Text textAlign="center">
                Phone: 022-xxx-xxx
                <br />
                Email: hello@extole.com
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" bg="#e01c4c" onClick={onContactClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <Box w="65%" h="100%" bg="white" borderRadius="md" p={4} boxShadow="md" mb={4}>
        <MonthOverMonthMiddle clientId={clientId} />
      </Box>

      <Box w="20%" bg="white" borderRadius="md" p={4} boxShadow="md" display="flex" flexDirection="column" h="96vh">
        <Text fontSize="3xl" textAlign="center" fontWeight="bold">More</Text>
        <VStack spacing={4} mt={4}>
        <Link onClick={onOpen}>
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
          <ClientPieChart clientId={clientId} />
          </Box>
        </VStack>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Profile Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder="email@extole.com" />
              </FormControl>
              <FormControl id="username" isRequired mt={4}>
                <FormLabel>Username</FormLabel>
                <Input placeholder="VintusS" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme="red" bg="#e01c4c" onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Save Changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}

export default MonthOverMonth;
