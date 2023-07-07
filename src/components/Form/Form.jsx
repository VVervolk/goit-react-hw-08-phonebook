import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormAdd } from './Form.styled';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/auth/services';

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
  const { data, refetch } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  async function handleSubmit(newContact, { resetForm }) {
    const checkAvailability = data.some(
      option => option.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (checkAvailability) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    try {
      await addContact(newContact);
      refetch();
      resetForm();
    } catch (error) {}
  }

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormAdd>
        <label htmlFor="name">Name</label>
        <Field name="name" id="name"></Field>
        <ErrorMessage name="name" />
        <label htmlFor="number">Number</label>
        <Field type="tel" name="number" id="number"></Field>
        <ErrorMessage name="number" />
        <Button type="submit">Add contact</Button>
      </FormAdd>
    </Formik>
  );
}
