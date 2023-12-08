import React from 'react';
import {
  FormControl as FormControlCha,
  FormLabel,
  Text,
  Box,
} from '@chakra-ui/react';
import Spinner from './Spinner';

const FormControl = ({
  children,
  label,
  required = false,
  showError = false,
  error = '',
  loading = false,
  ...rest
}) => {
  return (
    <FormControlCha isRequired={required} {...rest}>
      <Box display={'flex'} flexDirection={'row'}>
        <FormLabel>{label}</FormLabel> <Spinner size={'sm'} show={loading} />
      </Box>
      {children}
      {showError && <Text color="red">{error}</Text>}
    </FormControlCha>
  );
};

export default FormControl;
