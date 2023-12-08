import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  SimpleGrid,
  GridItem,
  Input,
  Switch,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FormControl } from '../../../components/UI';
import { validateSchema } from '../components/Schema';
import { useMutateTodo } from '../hooks/Todos';
import { set_todo } from '../../../store/slices/todo';
import { paths } from '../paths';

const Form = ({ edit = false }) => {
  const dispatch = useDispatch();
  const { todo: taskEdit } = useSelector(state => state.todo);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const { mutate, isLoading, reset } = useMutateTodo(
    edit ? 'UPDATE' : 'CREATE'
  );
  const toast = useToast();

  const initialValues = {
    userId: user?._id,
    id: '',
    task: '',
    due_date: '',
    completed: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validateSchema,
    validateOnMount: true,
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: resp => {
          console.log(resp);
          reset();
          resetForm();
          toast({
            title: `Task ${edit ? 'updated' : 'created'}.`,
            description: `The task has been ${edit ? 'updated' : 'created'}.`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          dispatch(set_todo({}));
          navigate(`/${paths.TODOS.front}`);
        },
        onError: err => {
          console.log(err);
          toast({
            title: 'An error has occurred.',
            description: `An error occurred while ${
              edit ? 'updating' : 'creating'
            } the task.`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        },
      });
    },
  });

  useEffect(() => {
    if (edit) {
      formik.setValues({
        ...formik.values,
        id: taskEdit._id,
        task: taskEdit.task,
        due_date: new Date(taskEdit.due_date).toISOString().split('T')[0],
        completed: taskEdit.completed,
      });
    }
  }, [edit]);

  return (
    <SimpleGrid columns={1} spacing={1}>
      <GridItem>
        <FormControl
          required={true}
          label="Task"
          showError={Boolean(formik.errors.task)}
          error={formik.errors.task}
        >
          <Input
            id="task"
            name="task"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.task}
          />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl
          required={true}
          label="Due Date"
          showError={Boolean(formik.errors.due_date)}
          error={formik.errors.due_date}
        >
          <Input
            id="due_date"
            name="due_date"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.due_date}
          />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl
          required={false}
          label="Completed"
          showError={Boolean(formik.errors.completed)}
          error={formik.errors.completed}
        >
          <Switch
            id="completed"
            name="completed"
            onChange={formik.handleChange}
            isChecked={formik.values.completed}
          />
        </FormControl>
      </GridItem>
      <GridItem mt={2} mb={0}>
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          w={'100%'}
          ml={'0%'}
          colorScheme="cyan"
          variant="outline"
          onClick={formik.handleSubmit}
        >
          Save
        </Button>
      </GridItem>
    </SimpleGrid>
  );
};

export default Form;
