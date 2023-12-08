//@libs
import axios from '../Axios';

//@paths
import { paths } from '../features/todos/paths';

const module = `/${paths.TODOS.back}`;

export const createTodo = async getData => {
  const { data } = await axios.post(
    `${module}?userId=${getData?.userId}`,
    getData,
    {}
  );
  return data;
};

export const getTodos = async getData => {
  const { data } = await axios.get(
    `${module}?userId=${getData.userId}&search=${getData.search}&sort=${getData.sort}`,
    getData,
    {}
  );
  return data;
};

export const updateTodo = async getData => {
  const { data } = await axios.put(`${module}/${getData?.id}`, getData, {});
  return data;
};

export const deleteTodo = async taskId => {
  const { data } = await axios.delete(`${module}/${taskId}`);
  return data;
};
