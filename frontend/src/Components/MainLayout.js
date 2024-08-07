import React from 'react';
import { Box, Flex, IconButton, Avatar, Menu, MenuButton, MenuList, MenuItem, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FiMenu, FiHome, FiVideo, FiLogOut, FiLogIn } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

function MainLayout({ children }) {
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const bg = useColorModeValue('gray.100', 'gray.900');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box minH="100vh" bg={bg} fontFamily="Arial, sans-serif">
      <Flex as="header" width="100%" px="4" py="2" align="center" justify="space-between" boxShadow="lg" bg={bg}>
        <IconButton icon={<FiMenu />} aria-label="Menu" variant="ghost" />
        <Flex align="center">
          <IconButton icon={<FiHome />} aria-label="Home" variant="ghost" onClick={() => navigate('/')} />
          {user ? (
            <Menu>
              <MenuButton as={IconButton} icon={<Avatar size="sm" />} variant="ghost" />
              <MenuList>
                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={toggleColorMode}>Toggle Theme</MenuItem>
                <MenuItem onClick={handleLogout} icon={<FiLogOut />}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button onClick={() => navigate('/login')} leftIcon={<FiLogIn />}>
              Login
            </Button>
          )}
        </Flex>
      </Flex>
      <Box as="main" p="4" maxW="1200px" mx="auto">
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;
