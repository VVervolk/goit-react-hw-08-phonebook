import { useState, useEffect, useRef } from 'react';
import { Section } from './App.styled';
import Contactsform from 'components/Form';
import InputSearch from 'components/InputSearch';
import Contacts from 'components/Contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  let isFirstRender = useRef(true);

  useEffect(() => {
    let contactsFromStorage = localStorage.getItem('contacts');
    if (contactsFromStorage) {
      contactsFromStorage = JSON.parse(contactsFromStorage);
      setContacts(contactsFromStorage);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function handleSubmit(newContact, { resetForm }) {
    if (checkAvailability(contacts, newContact)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    newContact.id = crypto.randomUUID().slice(0, 7);

    setContacts([...contacts, newContact]);
    resetForm();
  }

  function deleteContact(index) {
    setContacts(contacts.filter(value => value.id !== index));
  }

  return (
    <Section>
      <h1>Phonebook</h1>
      <Contactsform onSubmit={handleSubmit}></Contactsform>
      <h2>Contacts</h2>
      <InputSearch
        options={contacts}
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <Contacts
        options={contacts}
        filter={filter}
        deleteContact={deleteContact}
      ></Contacts>
    </Section>
  );
}

function checkAvailability(contacts, contact) {
  return contacts.some(
    option => option.name.toLowerCase() === contact.name.toLowerCase()
  );
}
