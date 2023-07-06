import { Section } from './App.styled';
import Contactsform from 'components/Form';
import InputSearch from 'components/InputSearch';
import Contacts from 'components/Contacts';

export default function App() {
  return (
    <Section>
      <h1>Phonebook</h1>
      <Contactsform></Contactsform>
      <h2>Contacts</h2>
      <InputSearch />
      <Contacts></Contacts>
    </Section>
  );
}
