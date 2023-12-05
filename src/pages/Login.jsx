import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
  Alert,
  AlertIcon,
  Flex,
  Image
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'dragomir.mindrescu@isa.utm.md' && password === 'admin') {
      navigate('/tableview');
    } else {
      setError('Invalid email or password');
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
