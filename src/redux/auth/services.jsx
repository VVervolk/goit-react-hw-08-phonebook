import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
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

  endpoints: builder => ({
    signUp: builder.mutation({
      query: credentials => ({
        url: 'users/signup',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // // `onStart` side-effect
        // dispatch(messageCreated('Fetching post...'));
        // try {
        //   const { data } = await queryFulfilled;
        //   // `onSuccess` side-effect
        //   dispatch(messageCreated('Post received!'));
        // } catch (err) {
        //   // `onError` side-effect
        //   dispatch(messageCreated('Error fetching post!'));
        // }
      },
    }),
    logIn: builder.mutation({
      query: credentials => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
    }),
    getContacts: builder.query({
      query: () => ({
        url: 'contacts',
        method: 'GET',
      }),
    }),
    addContact: builder.mutation({
      query: credentials => ({
        url: 'contacts',
        method: 'POST',
        body: credentials,
      }),
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
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useSignUpMutation,
  useLogInMutation,
  useLogOutMutation,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;

export const { useGetContactsQuery } = contactsApi;
