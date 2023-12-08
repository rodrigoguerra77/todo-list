import React from 'react';
import { Spinner as SpinnerCha } from '@chakra-ui/react';

const Spinner = ({
  size = 'xl',
  thickness = '6px',
  color = 'cyan.400',
  show = false,
}) => (
  <SpinnerCha
    opacity={show ? 1 : 0}
    thickness={thickness}
    speed={'1.65s'}
    emptyColor={'gray.100'}
    color={color}
    size={size}
  />
);

export default Spinner;
