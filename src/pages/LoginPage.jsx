import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from 'redux/auth/authSlice';
import { useLogInMutation } from 'redux/auth/services';
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
    <Flex
      backgroundSize="cover"
      minW="414px"
      backgroundImage={background}
      align="center"
      justify="center"
      h="90vh"
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
                email: '',
                password: '',
              }}
              onSubmit={handleSubmit}
            >
              <Form>
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
