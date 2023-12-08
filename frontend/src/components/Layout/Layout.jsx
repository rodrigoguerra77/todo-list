import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import SidebarContent from '../Navigation/SidebarContent';
import MobileNav from '../Navigation/MobileNav';

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent
          borderTopRightRadius="40"
          borderBottomRightRadius="40"
          bgColor="#F1ECE2"
        >
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        // display={{ base: 'flex', md: 'none' }}
        onOpen={onOpen}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
