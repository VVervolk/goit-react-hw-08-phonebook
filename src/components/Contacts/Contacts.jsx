import { useEffect } from 'react';
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { getContacts, getFilter, getIsLoading } from 'redux/selectors';
import { Oval } from 'react-loader-spinner';

export default function Contacts() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <Oval
          height={100}
          width={100}
          color="white"
          wrapperClass="spinner"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="black"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      {contacts.length !== 0 && (
        <ul>
          {filter === ''
            ? contacts.map(contact => (
                <Item key={contact.id} contact={contact}></Item>
              ))
            : contacts
                .filter(value =>
                  value.name.toLowerCase().includes(`${filter.toLowerCase()}`)
                )
                .map(contact => (
                  <Item key={contact.id} contact={contact}></Item>
                ))}
        </ul>
      )}
    </>
  );
}
