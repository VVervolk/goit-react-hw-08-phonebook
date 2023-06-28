import PropTypes from 'prop-types';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormAdd } from './Form.styled';

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

export default function Contactsform({ onSubmit }) {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
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

Contactsform.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
