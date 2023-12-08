import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useMutateUser } from '../hooks/Users';
import { FormControl } from '../../../components/UI';
import { validateCreateSchema } from '../components/Schema';
import { paths as pathsTodos } from '../../todos/paths';
import { login_success } from '../../../store/slices/auth';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.auth);

  const { mutate, isLoading, reset } = useMutateUser('CREATE');

  const toast = useToast();

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validateCreateSchema,
    validateOnMount: false,
    onSubmit: async (values, { resetForm }) => {
      // Create
      mutate(values, {
        onSuccess: resp => {
          console.log(resp);
          reset();
          resetForm();
          toast({
            title: `Logged in.`,
            description: `Welcome ${resp?.user?.first_name} ${resp?.user?.last_name}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          dispatch(
            login_success({
              user: {
                ...resp.user,
                token: resp.token,
              },
            })
          );
          navigate(`/${pathsTodos.TODOS.front}`);
        },
        onError: err => {
          console.log(err);
          toast({
            title: 'An error has occurred.',
            description: err?.response?.data
              ? err?.response?.data
              : `An error occurred while you were logging in.`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        },
      });
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/${pathsTodos.TODOS.front}`);
    }
  }, []);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>TODO App</Heading>
        </Stack>
        <Box
          w={'md'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl
              required={true}
              label="First name"
              showError={Boolean(formik.errors.first_name)}
              error={formik.errors.first_name}
            >
              <Input
                id="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
              />
            </FormControl>
            <FormControl
              required={true}
              label="Last name"
              showError={Boolean(formik.errors.last_name)}
              error={formik.errors.last_name}
            >
              <Input
                id="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
              />
            </FormControl>
            <FormControl
              required={true}
              label="Email"
              showError={Boolean(formik.errors.email)}
              error={formik.errors.email}
            >
              <Input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>
            <FormControl
              required={true}
              label="Password"
              showError={Boolean(formik.errors.password)}
              error={formik.errors.password}
            >
              <Input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={formik.handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack spacing={10}>
              <Text>
                Already a member? <Link to={'/login'}>Sign In</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
