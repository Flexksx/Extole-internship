import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Center, Flex, Button, FormControl, FormLabel, Input, Alert, AlertIcon, Image
} from '@chakra-ui/react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [clientIds, setClientIds] = useState([]);
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

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
    if (username.trim() && password) {
      if (password === 'admin') {
        navigate('/tableview');
      } else if (clientIds.includes(password)) {
        navigate(`/dashboard/${password}`);
      } else {
        setError('Invalid password');
      }
    } else {
      setError('Invalid username');
    }
  };

  return (
    <Center
      h="100vh"
      w="100vw"
      backgroundImage="url('https://removal.ai/wp-content/uploads/2021/05/image12-2.png')" // Replace with your image URL or path
      backgroundSize="cover" // Cover the entire page
      backgroundRepeat="no-repeat" // Prevent repeating the image
      backgroundPosition="center center" // Center the image
    >
      <Box w="400px" p={4} boxShadow="md" borderRadius="md" bg="white" opacity={0.9}>
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

        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Your Username" 
          />
        </FormControl>

        <FormControl id="password" mt={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
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
