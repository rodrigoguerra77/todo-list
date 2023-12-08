import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import RenderRoutes from './routes/RenderRoutes';
import { Loading } from './components/UI';
// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './store';

import 'react-phone-input-2/lib/style.css';

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Loading />}>
          <ChakraProvider>
            <Router>
              <RenderRoutes />
            </Router>
          </ChakraProvider>
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
