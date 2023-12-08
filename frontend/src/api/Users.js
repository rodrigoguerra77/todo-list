//@libs
import axios from '../Axios';

//@paths
import { paths } from '../features/users/paths';

const module = `/${paths.USERS.back}`;

export const createUser = async getData => {
  const { data } = await axios.post(`${module}/register`, getData, {});
  return data;
};

export const loginUser = async getData => {
  const { data } = await axios.post(`${module}/login`, getData, {});
  return data;
};
