import { Formik, Form, Field, ErrorMessage } from 'formik';
import { setCredentials } from 'redux/auth/authSlice';
import { useSignUpMutation } from 'redux/auth/services';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import background from 'images/background.svg';

const schema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required(),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        'Put a password with at least 8 characters, including 1 uppercase letter, and a combination of letters and numbers.',
      excludeEmptyString: true,
    })
    .required(),
});

export default function RegisterPage() {
  const [signUp] = useSignUpMutation();
  const dispatch = useDispatch();

  async function handleSubmit(credentials, { resetForm }) {
    try {
      const user = await signUp(credentials);
      if (user.error) {
        throw new Error();
      }
      dispatch(setCredentials(user.data));
      resetForm();
      toast.success('Successful registration!');
    } catch (error) {
      toast.error('Oops, something went wrong!');
    }
  }

  return (
    <Flex
      backgroundSize="cover"
      minW="414px"
      backgroundImage={background}
      align="center"
      justify="center"
      h="100vh"
    >
      <Box
        minHeight="200px"
        bg="white"
        p={6}
        rounded="md"
        w="clamp(386px,40%,800px )"
      >
        <VStack spacing={4} align="flex-start">
          <FormControl>
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
                <FormLabel width="full" htmlFor="name">
                  Your name
                  <Field
                    as={Input}
                    variant="filled"
                    type="text"
                    name="name"
                    id="name"
                  />
                </FormLabel>
                <ErrorMessage name="name" />
                <FormLabel width="full" htmlFor="email">
                  Email
                  <Field
                    as={Input}
                    variant="filled"
                    type="email"
                    name="email"
                    id="email"
                  />
                </FormLabel>
                <ErrorMessage name="email" />
                <FormLabel width="full" htmlFor="password">
                  Password
                  <Field
                    as={Input}
                    variant="filled"
                    type="password"
                    name="password"
                    id="password"
                  />
                </FormLabel>
                <ErrorMessage name="password" />
                <Button
                  _hover={{
                    bgColor: '#edf2f7',
                    color: 'blue.600',
                    borderWidth: '2px',
                    borderColor: 'blue.600',
                  }}
                  color="white"
                  bgColor="blue.600"
                  width="full"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Formik>
          </FormControl>
        </VStack>
      </Box>
    </Flex>
  );
}
