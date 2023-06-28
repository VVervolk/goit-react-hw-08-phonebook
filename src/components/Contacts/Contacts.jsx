import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/slices/contactsSlice';

export default function Contacts() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  return (
    <ul>
      {filter === ''
        ? contacts.map(contact => (
            <Item
              key={crypto.randomUUID().slice(0, 5)}
              contact={contact}
              deleteContact={() => dispatch(deleteContact(contact.id))}
            ></Item>
          ))
        : contacts
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
  );
}
