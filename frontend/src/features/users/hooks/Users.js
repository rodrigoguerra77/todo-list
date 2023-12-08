import { useMutation, useQueryClient } from 'react-query';
import { createUser, loginUser } from '../../../api/Users';

const key = 'users';

const getAction = type => {
  if (type === 'CREATE') return createUser;
  if (type === 'LOGIN') return loginUser;
  return null;
};

export function useMutateUser(type) {
  const queryClient = useQueryClient();
  const actionFn = getAction(type);
  return useMutation(actionFn, {
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    },
  });
}
