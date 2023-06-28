// import { useState, useEffect, useRef } from 'react';
import { Section } from './App.styled';
import Contactsform from 'components/Form';
import InputSearch from 'components/InputSearch';
import Contacts from 'components/Contacts';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

export default function App() {
  const contacts = useSelector(getContacts);
  console.log(contacts);

  // const [contacts, setContacts] = useState([]);

  // let isFirstRender = useRef(true);

  // // useEffect(() => {
  // //   let contactsFromStorage = localStorage.getItem('contacts');
  // //   if (contactsFromStorage) {
  // //     contactsFromStorage = JSON.parse(contactsFromStorage);
  // //     setContacts(contactsFromStorage);
  // //   }
  // // }, []);

  // // useEffect(() => {
  // //   if (isFirstRender.current) {
  // //     isFirstRender.current = false;
  // //     return;
  // //   }
  // //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // // }, [contacts]);

  return (
    <Section>
      <h1>Phonebook</h1>
      <Contactsform></Contactsform>
      <h2>Contacts</h2>
      <InputSearch />
      {/* {contacts.length !== 0 && <Contacts></Contacts>} */}
    </Section>
  );
}
