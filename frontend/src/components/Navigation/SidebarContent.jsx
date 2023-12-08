import React from 'react';

import {
  Text,
  Box,
  Flex,
  CloseButton,
  useColorModeValue,
} from '@chakra-ui/react';

// import Logo from '../../assets/react.svg';

import Menu from './Menu';

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      {/* <Flex direction={'column'} h="98vh"> */}
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          TODO App
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {/* <Flex direction={'column'}> */}
      <Menu />
      {/* </Flex> */}
      {/* </Flex> */}
    </Box>
  );
};

export default SidebarContent;
