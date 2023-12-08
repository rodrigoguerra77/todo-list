import React from 'react';
import { Box } from '@chakra-ui/react';
import { Layout, Spinner } from '../../../components/UI';
import { paths } from '../paths';
import Form from '../components/Form';

const TodoForm = ({ edit = false }) => {
  return (
    <Layout
      title={`${!edit ? 'Add new' : 'Edit'} property`}
      loading={<Spinner size={'lg'} show={false} />}
      showBackBtn={true}
      urlBack={`/${paths.TODOS.front}`}
    >
      <Box w={'100%'} h={'93%'} maxH={'93%'} overflowY="scroll">
        <Form edit={edit} />
      </Box>
    </Layout>
  );
};

export default TodoForm;
