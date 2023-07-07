import { Button } from 'components/Form/Form.styled';
import { Contact } from './Contacts.styled';
import PropTypes from 'prop-types';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from 'redux/auth/services';

export default function Item({ contact }) {
  const { refetch } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  async function handleClick() {
    await deleteContact(contact.id);
    refetch();
  }

  return (
    <Contact>
      <p>
        {contact.name}: {contact.number}
      </p>
      <Button type="button" onClick={handleClick}>
        Delete
      </Button>
    </Contact>
  );
}

Item.propTypes = {
  contact: PropTypes.object.isRequired,
};
