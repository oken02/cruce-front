import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import branchReducer from './reducers/branchReducer';
import userReducer from './reducers/usersReducer';

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    branch: branchReducer,
  },
});

export default store;
