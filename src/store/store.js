import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    users: usersReducer,
  },
});

export default store;
