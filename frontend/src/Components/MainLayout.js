// src/Components/MainLayout.js
import React from 'react';
import { Box, Flex, IconButton, Avatar, Menu, MenuButton, MenuList, MenuItem, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FiMenu, FiHome, FiVideo, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function MainLayout({ children }) {
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.900');

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <Box minH="100vh" bg={bg}>
      <Flex as="header" width="100%" px="4" py="2" align="center" justify="space-between" boxShadow="md">
        <IconButton icon={<FiMenu />} aria-label="Menu" />
        <Flex align="center">
          <IconButton icon={<FiHome />} aria-label="Home" onClick={() => navigate('/')} />
          <Menu>
            <MenuButton as={IconButton} icon={<Avatar size="sm" />} />
            <MenuList>
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={toggleColorMode}>Toggle Theme</MenuItem>
              <MenuItem onClick={handleLogout} icon={<FiLogOut />}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Box as="main" p="4">
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;
