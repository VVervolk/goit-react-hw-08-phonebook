import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import RegisterPage from 'pages/RegisterPage';
import { PublicRoute } from 'components/PublicRoute';
import LoginPage from 'pages/LoginPage';
import { PrivateRoute } from 'components/PrivateRoute';
import Layout from 'components/Layout/Layout';
import Contacts from 'pages/Contacts';

export default function App() {
  return (
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
            <PublicRoute redirectTo="/contacts" component={<RegisterPage />} />
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
  );
}
