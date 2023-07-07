import { Formik, Form, Field, ErrorMessage } from 'formik';
import { setCredentials } from 'redux/auth/authSlice';
import { useSignUpMutation } from 'redux/auth/services';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z '-]+$/, {
      message:
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
      excludeEmptyString: true,
    })
    .trim()
    .required(),
  email: Yup.string().email('Must be a valid email').required(),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        'Create a password with at least 8 characters, including 1 uppercase letter, and a combination of letters and numbers.',
      excludeEmptyString: true,
    })
    .required(),
});

export default function RegisterPage() {
  const [signUp] = useSignUpMutation();

  async function handleSubmit(credentials, { resetForm }) {
    try {
      const user = await signUp(credentials);
      setCredentials(user.data);
      resetForm();
    } catch (error) {}
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label htmlFor="name">
          Your name
          <Field type="text" name="name" id="name" />
        </label>
        <ErrorMessage name="name" />
        <label htmlFor="email">
          Email
          <Field type="email" name="email" id="email" />
        </label>
        <ErrorMessage name="email" />
        <label htmlFor="password">
          Password
          <Field type="password" name="password" id="password" />
        </label>
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
