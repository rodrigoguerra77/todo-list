import React from 'react';
import { Alert as AlertCha, AlertTitle, Icon } from '@chakra-ui/react';
import {
  FiCheckCircle as SuccessIcon,
  FiAlertCircle as WarningIcon,
  FiXCircle as ErrorIcon,
} from 'react-icons/fi';

const Alert = ({ status, message }) => {
  const renderStyle = () => {
    switch (status) {
      case 'success':
        return {
          icon: <Icon as={SuccessIcon} />,
          color: '#029920',
        };
      case 'warning':
        return {
          icon: <Icon as={WarningIcon} />,
          color: '#fc5603',
        };
      case 'error':
        return {
          icon: <Icon as={ErrorIcon} />,
          color: '#700101',
        };
      default:
        return {
          icon: null,
          color: '#FFFFFF',
        };
    }
  };

  return (
    <AlertCha
      status={status}
      borderRadius={8}
      color={renderStyle().color}
      gap={2}
      opacity={0.9}
    >
      {renderStyle().icon}
      <AlertTitle>{message}</AlertTitle>
    </AlertCha>
  );
};

export default Alert;
