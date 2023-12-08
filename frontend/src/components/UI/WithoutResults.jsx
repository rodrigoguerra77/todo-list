import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Button } from '../UI';

const WithoutResults = ({ showBtn = false, propsBtn = {} }) => {
  return (
    <>
      <Flex justify={'center'} align={'center'}>
        <Text fontWeight={500} color={'cyan.400'} fontSize={'xl'}>
          No results to show.
        </Text>
      </Flex>
      <Flex justify={'center'} align={'center'}>
        {showBtn && (
          <Button
            icon={propsBtn?.icon}
            text={propsBtn?.text}
            onClick={propsBtn?.click}
          />
        )}
      </Flex>
    </>
  );
};

export default WithoutResults;
