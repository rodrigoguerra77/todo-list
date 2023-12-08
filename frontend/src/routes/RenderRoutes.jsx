import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './routes';

function RenderRoutes() {
  const { isLoggedIn } = useSelector(state => state.auth);

  return (
    <>
      <Routes>
        {routes.map(item => (
          <Route
            key={`router-${item.key}`}
            path={item.path}
            element={<item.element />}
            authenticated={isLoggedIn}
          />
        ))}
      </Routes>
    </>
  );
}

export default RenderRoutes;
