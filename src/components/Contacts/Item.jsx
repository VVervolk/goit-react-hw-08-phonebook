import { Button } from 'components/Form/Form.styled';
import { Contact } from './Contacts.styled';
import PropTypes from 'prop-types';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from 'redux/auth/services';
import { toast } from 'react-toastify';

const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export default function Item({ contact }) {
  const { refetch } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  async function handleClick() {
    try {
      await deleteContact(contact.id);
      toast.success('Successful deleting contact!', toastOptions);
      refetch();
    } catch (error) {
      toast.error('Oops, something went wrong!', toastOptions);
    }
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
