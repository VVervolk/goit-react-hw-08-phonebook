import { useEffect } from 'react';
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/slices/contactsSlice';

export default function Contacts() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  console.log(contacts.items.length);

  return (
    contacts.items.length !== 0 && (
      <ul>
        {filter === ''
          ? contacts.items.map(contact => (
              <Item
                key={crypto.randomUUID().slice(0, 5)}
                contact={contact}
                deleteContact={() => dispatch(deleteContact(contact.id))}
              ></Item>
            ))
          : contacts.items
              .filter(value =>
                value.name.toLowerCase().includes(`${filter.toLowerCase()}`)
              )
              .map(contact => (
                <Item
                  key={crypto.randomUUID().slice(0, 5)}
                  contact={contact}
                  deleteContact={() => dispatch(deleteContact(contact.id))}
                ></Item>
              ))}
      </ul>
    )
  );
}
