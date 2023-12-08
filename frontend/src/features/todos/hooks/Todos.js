import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getTodos,
  deleteTodo,
  createTodo,
  updateTodo,
} from '../../../api/Todos';

const key = 'todos';

const getAction = type => {
  if (type === 'CREATE') return createTodo;
  if (type === 'UPDATE') return updateTodo;
  if (type === 'DELETE') return deleteTodo;
  return null;
};

export function useTodos(getData, props = {}) {
  return useQuery([key, getData], () => getTodos(getData), {
    ...props,
  });
}

export function useMutateTodo(type) {
  const queryClient = useQueryClient();
  const actionFn = getAction(type);
  return useMutation(actionFn, {
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    },
  });
}
