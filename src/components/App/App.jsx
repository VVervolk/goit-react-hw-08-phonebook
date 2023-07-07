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
      <Route path="/goit-react-hw-08-phonebook/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/goit-react-hw-08-phonebook/contacts"
          element={
            <PrivateRoute
              redirectTo="/goit-react-hw-08-phonebook/login"
              component={<Contacts />}
            />
          }
        ></Route>
        <Route
          path="/goit-react-hw-08-phonebook/register"
          element={
            <PublicRoute
              redirectTo="/goit-react-hw-08-phonebook/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/goit-react-hw-08-phonebook/login"
          element={
            <PublicRoute
              redirectTo="/goit-react-hw-08-phonebook/contacts"
              component={<LoginPage />}
            />
          }
        />
        {/* <Route path="*" element={<NotFound />}></Route> */}
      </Route>
    </Routes>
  );
}
