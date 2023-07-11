import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 5,
  endpoints: builder => ({
    signUp: builder.mutation({
      query: credentials => ({
        url: 'users/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    logIn: builder.mutation({
      query: credentials => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
      transformErrorResponse: () => {
        toast.error('Oops, something went wrong!', toastOptions);
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
      transformErrorResponse: () => {
        toast.error('Oops, something went wrong!', toastOptions);
      },
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   dispatch(contactsApi.util.resetApiState());
      //   try {
      //     await queryFulfilled;
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
    }),
    getContacts: builder.query({
      query: () => ({
        url: 'contacts',
        method: 'GET',
      }),
      transformErrorResponse: () => {
        toast.error('Oops, something went wrong!', toastOptions);
      },
    }),
    addContact: builder.mutation({
      query: credentials => ({
        url: 'contacts',
        method: 'POST',
        body: credentials,
      }),
      transformErrorResponse: () => {
        toast.error('Oops, something went wrong!', toastOptions);
      },
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `contacts/${contactId}`,
        method: 'DELETE',
      }),
    }),
    updateContact: builder.mutation({
      query: (contactId, credentials) => ({
        url: `contacts/${contactId}`,
        method: 'PATCH',
        body: credentials,
      }),
      transformErrorResponse: () => {
        toast.error('Oops, something went wrong!', toastOptions);
      },
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: 'users/current',
        method: 'GET',
      }),
      transformErrorResponse: () => {
        toast.error('Oops, something went wrong!', toastOptions);
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useLogOutMutation,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;

export const { useGetContactsQuery, useGetCurrentUserQuery } = contactsApi;
