//@libs
import { lazy } from 'react';

//@paths
import { paths } from './paths';

//@pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const usersRoutes = [
  {
    path: `/${paths.LOGIN.front}`,
    key: 'LOGIN',
    exact: true,
    element: () => <Login />,
  },
  {
    path: `/${paths.REGISTER.front}`,
    key: 'REGISTER',
    exact: true,
    element: () => <Register />,
  },
];

export default usersRoutes;
