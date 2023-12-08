import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Box textAlign="center">
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, red.400, red.600)"
          backgroundClip="text"
        >
          401
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Unauthorized
        </Text>
        <Text color={'gray.500'} mb={6}>
          You are not authorized to see the content of this website, please log
          in
        </Text>
        <Link to={`/login`}>
          <Button
            colorScheme="red"
            bgGradient="linear(to-r, red.400, red.500, red.600)"
            color="white"
            variant="solid"
          >
            Go to log in
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
