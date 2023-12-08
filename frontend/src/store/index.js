import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import todo from './slices/todo';
import auth from './slices/auth';

const reducers = combineReducers({
  todo,
  auth,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_NODE_ENV !== 'production',
  middleware: [thunk],
});
