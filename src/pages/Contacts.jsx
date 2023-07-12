import { useGetContactsQuery } from 'redux/auth/services';
import { getFilter } from 'redux/selectors';
import Item from 'components/Contacts/Item';
import { useSelector } from 'react-redux';
import Contactsform from 'components/Form/Form';
import { Container } from 'components/others/Container.styled';

export default function Contacts() {
  const { data } = useGetContactsQuery();
  const filter = useSelector(getFilter);
  const shouldRenderContacts = data && data.length !== 0;

  return (
    <>
      <Container>
        <Contactsform></Contactsform>
        {shouldRenderContacts && (
          <ul>
            {filter === ''
              ? data.map(contact => (
                  <Item key={contact.id} contact={contact}></Item>
                ))
              : data
                  .filter(value =>
                    value.name.toLowerCase().includes(`${filter.toLowerCase()}`)
                  )
                  .map(contact => (
                    <Item key={contact.id} contact={contact}></Item>
                  ))}
          </ul>
        )}
      </Container>
    </>
  );
}
