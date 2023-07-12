import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/auth/services';
import { toast } from 'react-toastify';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import InputSearch from 'components/InputSearch/InputSearch';

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  async function handleSubmit(newContact, { resetForm }) {
    const checkAvailability = data.some(
      option => option.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (checkAvailability) {
      toast.warn(`${newContact.name} is already in contacts`);
      return;
    }
    try {
      await addContact(newContact);
      refetch();
      resetForm();
      onClose();
      toast.success('Successful adding contact!');
    } catch (error) {
      toast.error('Oops, something went wrong!');
    }
  }

  return (
    <>
      <Flex
        gap={'5%'}
        mt={'30px'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <InputSearch />

        <Button
          bgColor={'blue.600'}
          color={'white'}
          display={'flex'}
          alignItems={'center'}
          p={'8px'}
          w={'clamp(30px,15%,140px)'}
          onClick={onOpen}
          fontSize={'clamp(0.5rem, 1.5vw, 1.0rem)'}
        >
          <Text display={{ base: 'none', md: 'block' }}>Add contact</Text>
          <AddIcon
            w={{ base: '1.9em', md: '1em' }}
            h={{ base: '1.9em', md: '1em' }}
            ml={{ md: '8px' }}
          />
        </Button>
      </Flex>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Formik
                initialValues={{
                  name: '',
                  number: '',
                }}
                validationSchema={schema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field as={Input} name="name" id="name"></Field>
                  <ErrorMessage name="name" />
                  <FormLabel htmlFor="number">Number</FormLabel>
                  <Field
                    as={Input}
                    type="tel"
                    name="number"
                    id="number"
                  ></Field>
                  <ErrorMessage name="number" />
                  <Button type="submit">Add contact</Button>
                  <Button onClick={onClose}>Cancel</Button>
                </Form>
              </Formik>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
