import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import todosRoutes from '../features/todos/routes';
import usersRoutes from '../features/users/routes';

import { paths as userPaths } from '../features/users/paths';

const Unauthorized = lazy(() => import('../features/errors/pages/401'));

const generalsRoutes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    element: () => <Navigate to={`/${userPaths.LOGIN.front}`} />,
  },
  {
    path: '/401',
    key: '401',
    exact: true,
    element: () => <Unauthorized />,
  },
];

const routes = [...generalsRoutes, ...todosRoutes, ...usersRoutes];

export default routes;
