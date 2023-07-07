import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './slices/filterSlice';
import { contactsApi } from './auth/services';
import { authReducer } from './auth/authSlice';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    auth: authReducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
