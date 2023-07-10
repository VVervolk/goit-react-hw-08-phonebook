import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from 'redux/auth/authSlice';
import { useLogInMutation } from 'redux/auth/services';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required(),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        'Create a password with at least 8 characters, including 1 uppercase letter, and a combination of letters and numbers.',
      excludeEmptyString: true,
    })
    .required(),
});

export default function LoginPage() {
  const [logIn] = useLogInMutation();
  const dispatch = useDispatch();

  async function handleSubmit(credentials, { resetForm }) {
    try {
      const user = await logIn(credentials);

      dispatch(setCredentials(user.data));
      resetForm();
      toast.success('Successful login!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {}
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
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
