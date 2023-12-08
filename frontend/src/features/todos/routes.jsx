//@libs
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//@paths
import { paths } from './paths';

//@layout
import Layout from '../../components/Layout/Layout';

//@pages
const Todos = lazy(() => import('./pages/Todos'));
const TodoForm = lazy(() => import('./pages/TodoForm'));

//@components
import Can from '../../auth/Can';

const propertiesRoutes = [
  {
    path: `/${paths.TODOS.front}`,
    key: 'TODOS',
    exact: true,
    element: () => (
      <Can
        yes={() => (
          <Layout>
            <Todos />
          </Layout>
        )}
        no={() => <Navigate to="/401" />}
      />
    ),
  },
  {
    path: `/${paths.TODOS.front}/add-new`,
    key: 'TODOS_CREATE',
    exact: true,
    element: () => (
      <Can
        yes={() => (
          <Layout>
            <TodoForm />
          </Layout>
        )}
        no={() => <Navigate to="/401" />}
      />
    ),
  },
  {
    path: `/${paths.TODOS.front}/edit`,
    key: 'TODOS_EDIT',
    exact: true,
    element: () => (
      <Can
        yes={() => (
          <Layout>
            <TodoForm edit={true} />
          </Layout>
        )}
        no={() => <Navigate to="/401" />}
      />
    ),
  },
];

export default propertiesRoutes;
