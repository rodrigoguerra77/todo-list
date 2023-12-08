import React from 'react';
import { Button as ButtonCha, Icon } from '@chakra-ui/react';

const Button = ({
  text,
  icon,
  bg = 'cyan.400',
  variant = 'solid',
  bghover = 'gray.400',
  color = '#FFFFFF',
  py = 5,
  px = 5,
  mx = 2,
  disabled = false,
  isLoading = false,
  onClick,
  ...props
}) => (
  <>
    {icon ? (
      <ButtonCha
        leftIcon={<Icon mr="2" fontSize="26" as={icon} />}
        variant={variant}
        bg={bg}
        color={color}
        _hover={{
          bg: bghover,
        }}
        mx={mx}
        py={py}
        px={px}
        borderRadius={8}
        disabled={disabled}
        isLoading={isLoading}
        onClick={onClick}
        loadingText={'Cargando...'}
        {...props}
      >
        {text}
      </ButtonCha>
    ) : (
      <ButtonCha
        variant={variant}
        bg={bg}
        color={color}
        _hover={{ bg: bghover }}
        mx={mx}
        py={py}
        px={px}
        borderRadius={8}
        disabled={disabled}
        onClick={onClick}
        isLoading={isLoading}
        loadingText={'Cargando...'}
        {...props}
      >
        {text}
      </ButtonCha>
    )}
  </>
);

export default Button;
