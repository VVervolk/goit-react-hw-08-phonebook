import { Button } from 'components/Form/Form.styled';
import { Contact } from './Contacts.styled';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';

export default function Item({ contact }) {
  const dispatch = useDispatch();

  return (
    <Contact>
      <p>
        {contact.name}: {contact.number}
      </p>
      <Button type="button" onClick={() => dispatch(deleteContact(contact.id))}>
        Delete
      </Button>
    </Contact>
  );
}

Item.propTypes = {
  contact: PropTypes.object.isRequired,
};
