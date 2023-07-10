import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const AuthState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: AuthState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    removeCredentials: state => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    refreshCredentials: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

export const { setCredentials, removeCredentials, refreshCredentials } =
  authSlice.actions;

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
