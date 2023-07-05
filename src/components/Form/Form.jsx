import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormAdd } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';

const schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
      message:
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
      excludeEmptyString: true,
    })
    .required(),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      {
        message:
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
        excludeEmptyString: true,
      }
    )
    .required(),
});

export default function Contactsform() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  function handleSubmit(newContact, { resetForm }) {
    if (checkAvailability(contacts, newContact)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    dispatch(addContact(newContact));
    resetForm();
  }

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormAdd>
        <label htmlFor="name">Name</label>
        <Field name="name" id="name"></Field>
        <ErrorMessage name="name" />
        <label htmlFor="phone">Number</label>
        <Field type="tel" name="phone" id="phone"></Field>
        <ErrorMessage name="phone" />
        <Button type="submit">Add contact</Button>
      </FormAdd>
    </Formik>
  );
}

function checkAvailability(contacts, contact) {
  return contacts.items.some(
    option => option.name.toLowerCase() === contact.name.toLowerCase()
  );
}
