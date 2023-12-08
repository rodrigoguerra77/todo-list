import React from 'react';
import { Link } from 'react-router-dom';
import { SimpleGrid, Box, Heading, Button, IconButton } from '@chakra-ui/react';
import { FiChevronLeft } from 'react-icons/fi';

const Layout = ({
  children,
  title,
  loading = <></>,
  bg = 'white',
  spacing = 3,
  showBtn = false,
  wBtn = '40%',
  url = '/',
  showBackBtn = false,
  urlBack = '/',
}) => (
  <SimpleGrid columns={1} spacing={spacing}>
    <Box bg={bg} height="87vh" padding={2} maxH="87vh">
      <Heading as="h3" size="lg" fontFamily="monospace" mb={2}>
        {showBackBtn && (
          <>
            <Link to={urlBack}>
              <IconButton
                icon={<FiChevronLeft />}
                colorScheme="gray"
                variant="outline"
              >
                Add new
              </IconButton>
            </Link>{' '}
          </>
        )}
        {title} {loading}{' '}
        {showBtn && (
          <Link to={url}>
            <Button w={wBtn} colorScheme="cyan" variant="outline">
              Add new
            </Button>
          </Link>
        )}
      </Heading>
      {children}
    </Box>
  </SimpleGrid>
);

export default Layout;
