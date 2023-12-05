import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Center, Flex, Button, FormControl, FormLabel, Input, Alert, AlertIcon, Image
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [clientIds, setClientIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientIds = async () => {
      try {
        const response = await fetch('http://localhost:2000/mainmenu');
        const data = await response.json();
        const ids = data.map(item => item.client_id);
        setClientIds(ids);
      } catch (err) {
        console.error('Failed to fetch client IDs:', err);
        setError('Failed to load client data');
      }
    };

    fetchClientIds();
  }, []);

  const handleLogin = () => {
    if (email === 'dragomir.mindrescu@isa.utm.md') {
      if (password === 'admin') {
        navigate('/tableview');
      } else if (clientIds.includes(password)) {
        navigate(`/dashboard/${password}`);
      } else {
        setError('Invalid password');
      }
    } else {
      setError('Invalid email');
    }
  };

  return (
    <Center h="100vh">
      <Box w="400px" p={4} boxShadow="md" borderRadius="md">
        <Center>
        <img
        src="https://4a71b5761700fa86bf84.cdn6.editmysite.com/uploads/b/4a71b5761700fa86bf842ad62ae8665c4f535d423548ebe8cdacd81778f0713f/Extole-logo_large-copy_1656441979.png?width=800&optimize=medium"
        alt="Extole Logo"
        width="200"
      />
        </Center>

        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com" 
          />
        </FormControl>

        <FormControl id="password" mt={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
          />
        </FormControl>

        <Flex justifyContent="center" mt={4}>
          <Button
            bg="#e01c4c"
            color="white"
            _hover={{ bg: "#c71a3b" }}
            _active={{ bg: "#af1729" }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default Login;
