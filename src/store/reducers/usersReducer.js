import axios from 'axios';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
// import { useToast } from '@chakra-ui/react';


export const loginUser = createAsyncThunk('LOGIN_USER', (userEmail) => {
  return axios
    .post('http://localhost:3001/api/users/login', userEmail)
    .then((response) => {
      return response.data;
    });
});

export const logoutUser = createAsyncThunk('LOGOUT_USER', () => {
  return axios
    .post('http://localhost:3001/api/users/logout')
    .then((response) => {
      return response.data;
    });
});

const initialState = {
  loggedIn: JSON.parse(localStorage.getItem('user')) || null,
  allUsers: [],
  allOrders: [],
};

// const toast = useToast();
// const statuses = ['success', 'error', 'warning', 'info'];


const usersReducer = createReducer(initialState, {
  [loginUser.fulfilled]: (state, action) => {
    localStorage.setItem('user', JSON.stringify(action.payload));
    state.loggedIn = action.payload;
    // toast({
    //   title: `Usuario logueado con exito`,
    //   status: 'success',
    //   isClosable: true,
    // });
    return state;
  },
  [loginUser.pending]: (state, action) => {
    // toast({
    //   title: `Buscando usuario...`,
    //   status: 'info',
    //   isClosable: true,
    // });
    return state;
  },
  [loginUser.rejected]: (state, action) => {
    // toast({
    //   title: `Usuario no encontrado`,
    //   status: 'error',
    //   isClosable: true,
    // });
    return state;
  },
});

export default usersReducer;
