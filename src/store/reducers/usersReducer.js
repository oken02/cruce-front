import axios from "axios";
import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
// import { useToast } from '@chakra-ui/react';

export const loginUser = createAsyncThunk(
  "LOGIN_USER",
  ({ email, password }) => {
    return axios
      .post("http://localhost:3001/api/auth/login", { email, password })
      .then((response) => {
        return response.data; //{ ok: true, user, token }
      });
  }
);

export const sendValidation = createAsyncThunk(
  "SEND_VALIDATION",
  (data, thunkAPI) => {
    const token = localStorage.getItem("token");

    if (!token) return thunkAPI.rejectWithValue();

    console.log("TOKEN", token);
    
    return axios
      .post(
        "http://localhost:3001/api/auth/validate",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(({ data }) => data);
  }
);

export const logoutUser = createAction("LOGOUT");

const initialState = {
  // loggedUser: JSON.parse(localStorage.getItem('user')) || null,
  loggedUser: {},
  // allUsers: [],
  // allOrders: [],
  isValidated: !localStorage.getItem("token"),
  isAuthenticated: false,
};

// const toast = useToast();
// const statuses = ['success', 'error', 'warning', 'info'];

const userReducer = createReducer(initialState, {
  [loginUser.fulfilled]: (state, action) => {
    // action.payload = { ok: true, user:{name:"kevin"}, token }
    localStorage.setItem("token", action.payload.token);
    state.loggedUser = action.payload.user;
    state.isAuthenticated = true;
    // toast({
    //   title: `Usuario logueado con exito`,
    //   status: 'success',
    //   isClosable: true,
    // });
    // return state;
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

  [sendValidation.fulfilled]: (state, action) => {
    state.loggedUser = action.payload.user;
    state.isValidated = true;
    state.isAuthenticated = true;
  },
  [sendValidation.rejected]: (state, action) => {
    localStorage.removeItem("token");
    state.validated = true;
    state.isAuthenticated = false;
  },
  [logoutUser]: (state, action) => {
    localStorage.removeItem("token")
    state.isAuthenticated = false;
  }
});

export default userReducer;
