import { Button } from 'components/Form/Form.styled';
import { Contact } from './Contacts.styled';
import PropTypes from 'prop-types';

export default function Item({ contact, deleteContact }) {
  return (
    <Contact>
      <p>
        {contact.name}: {contact.number}
      </p>
      <Button
        type="button"
        onClick={() => {
          deleteContact(contact.id);
        }}
      >
        Delete
      </Button>
    </Contact>
  );
}

Item.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
