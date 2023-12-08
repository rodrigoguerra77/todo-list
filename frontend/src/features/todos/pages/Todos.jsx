import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Input,
  IconButton,
  useToast,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { FiRefreshCw, FiEdit, FiTrash2 } from 'react-icons/fi';
import DataTable from 'react-data-table-component';
import { useTodos, useMutateTodo } from '../hooks/Todos';
import {
  Layout,
  Spinner,
  Alert,
  WithoutResults,
  DeleteModal,
} from '../../../components/UI';
import { paths } from '../paths';
import { FormatDate } from '../../../utils';

/* redux */
import { useDispatch, useSelector } from 'react-redux';
import { set_todo } from '../../../store/slices/todo';

const Properties = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector(state => state.auth);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const getData = { userId: user?._id, search: '', sort: 'ASC' };
  const { data, isLoading, isFetching, isError, refetch } = useTodos(getData);
  const { mutate } = useMutateTodo('DELETE');
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    mutate(task?._id, {
      onSuccess: resp => {
        onCloseDelete();
        setLoading(false);
        refetch();
        setTasks(data);
        setTask(null);
        toast({
          title: 'Task removed.',
          description: resp?.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        onCloseDelete();
        setLoading(false);
        toast({
          title: 'An error has occurred.',
          description: 'An error occurred while deleting the task.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        refetch();
        setTasks(data);
        setTask(null);
      },
    });
  };

  const handleSearch = event => {
    const newProperties = data.filter(row =>
      row?.task.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setTasks(newProperties);
  };

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const columns = [
    {
      name: 'Task',
      cell: row =>
        row?.completed ? (
          <Text as="s">{row?.task}</Text>
        ) : (
          <Text>{row?.task}</Text>
        ),
      sortable: true,
      wrap: true,
    },
    {
      name: 'Due Date',
      selector: row => FormatDate(row?.due_date),
      sortable: true,
      wrap: true,
    },
    {
      name: 'Options',
      button: true,
      cell: row => (
        <Box>
          <Link to={`/${paths.TODOS.front}/edit`}>
            <IconButton
              icon={<FiEdit />}
              colorScheme="gray"
              variant="outline"
              onClick={() => {
                dispatch(set_todo(row));
              }}
            ></IconButton>
          </Link>
          <IconButton
            icon={<FiTrash2 />}
            colorScheme="red"
            variant="outline"
            onClick={() => {
              setTask(row);
              onOpenDelete();
            }}
            ml={3}
          ></IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Layout
      title="TODOS"
      loading={<Spinner size={'lg'} show={isLoading || isFetching} />}
      showBtn={true}
      url={`/${paths.TODOS.front}/add-new`}
    >
      <Box w={'100%'} h={'93%'} maxH={'93%'} overflowY="scroll">
        {isError && (
          <Alert status="error" message="Error al Cargar los Datos" />
        )}
        {data?.length === 0 && (
          <WithoutResults
            showBtn={true}
            propsBtn={{ icon: FiRefreshCw, text: 'Refresh', click: refetch }}
          />
        )}
        {data?.length > 0 && (
          <>
            <Input placeholder="Search" onChange={handleSearch} />
            <DataTable
              columns={columns}
              data={tasks}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 20]}
              responsive
            ></DataTable>
          </>
        )}
        <DeleteModal
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          title="Task"
          message={`Are you sure to delete the task "${task?.task}"?`}
          onDelete={handleDelete}
          loading={loading}
        />
      </Box>
    </Layout>
  );
};

export default Properties;
