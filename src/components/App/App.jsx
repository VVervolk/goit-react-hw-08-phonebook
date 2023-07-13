import { Route, Routes } from 'react-router-dom';
import { PublicRoute } from 'components/others/PublicRoute';
import { PrivateRoute } from 'components/others/PrivateRoute';
import Layout from 'components/Layout';
import { useGetCurrentUserQuery } from 'redux/auth/services';
import { lazy, useEffect } from 'react';
import { refreshCredentials } from 'redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, selectIsLoggedIn } from 'redux/selectors';
import { ToastContainer } from 'react-toastify';
import { Box, Spinner } from '@chakra-ui/react';

const Home = lazy(() => import('pages/Home'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const Contacts = lazy(() => import('pages/Contacts'));

export default function App() {
  const token = useSelector(getToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data, isFetching } = useGetCurrentUserQuery(
    {},
    { skip: Boolean(!token) || isLoggedIn }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(refreshCredentials(data));
    }
  }, [data, dispatch]);

  return (
    <>
      {isFetching ? (
        <Box height={'100vh'} position={'relative'}>
          <Spinner
            position={'absolute'}
            top={'45%'}
            left={'50%'}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.600"
            size="xl"
          />
        </Box>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PublicRoute redirectTo="/contacts" component={<Home />} />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/login" component={<Contacts />} />
              }
            ></Route>
            <Route
              path="/register"
              element={
                <PublicRoute
                  redirectTo="/contacts"
                  component={<RegisterPage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute redirectTo="/contacts" component={<LoginPage />} />
              }
            />
            <Route
              path="*"
              element={
                <PublicRoute redirectTo="/contacts" component={<Home />} />
              }
            ></Route>
          </Route>
        </Routes>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
