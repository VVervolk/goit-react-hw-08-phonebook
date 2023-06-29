import { Section } from './App.styled';
import Contactsform from 'components/Form';
import InputSearch from 'components/InputSearch';
import Contacts from 'components/Contacts';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

export default function App() {
  const contacts = useSelector(getContacts);

  return (
    <Section>
      <h1>Phonebook</h1>
      <Contactsform></Contactsform>
      <h2>Contacts</h2>
      <InputSearch />
      {contacts.length !== 0 && <Contacts></Contacts>}
    </Section>
  );
}
