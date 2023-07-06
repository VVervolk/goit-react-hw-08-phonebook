// import { Section } from './App.styled';
// import Contactsform from 'components/Form';
// import InputSearch from 'components/InputSearch';
import Contacts from 'components/Contacts';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import RegisterPage from 'pages/RegisterPage';
import { PublicRoute } from 'components/PublicRoute';
import LoginPage from 'pages/LoginPage';
import { PrivateRoute } from 'components/PrivateRoute';
import Layout from './Layout/Layout';

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
          path="/goit-react-hw-07-phonebook/register"
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
    // <Section>
    //   <h1>Phonebook</h1>
    //   <Contactsform></Contactsform>
    //   <h2>Contacts</h2>
    //   <InputSearch />
    //   <Contacts></Contacts>
    // </Section>
  );
}
