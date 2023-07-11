import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/Home';
import RegisterPage from 'pages/RegisterPage';
import { PublicRoute } from 'components/others/PublicRoute';
import LoginPage from 'pages/LoginPage';
import { PrivateRoute } from 'components/others/PrivateRoute';
import Layout from 'components/Layout/Layout';
import Contacts from 'pages/Contacts';
import { useGetCurrentUserQuery } from 'redux/auth/services';
import { useEffect } from 'react';
import { refreshCredentials } from 'redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, selectIsLoggedIn } from 'redux/selectors';
import { ToastContainer } from 'react-toastify';

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
        <h1>fetching...</h1>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
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
            {/* <Route path="*" element={<NotFound />}></Route> */}
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
