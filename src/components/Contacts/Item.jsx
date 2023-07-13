import PropTypes from 'prop-types';
import {
  useDeleteContactMutation,
  useUpdateContactMutation,
  useGetContactsQuery,
} from 'redux/auth/services';
import { toast } from 'react-toastify';
import {
  ListItem,
  ListIcon,
  Text,
  Avatar,
  ButtonGroup,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRef } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

export default function Item({ contact }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { refetch } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  async function handleDelete() {
    try {
      await deleteContact(contact.id);
      toast.success('Successful deleting contact!');
      refetch();
    } catch (error) {
      toast.error('Oops, something went wrong!');
    }
  }

  async function handleEdit(credentials) {
    const id = contact.id;

    try {
      await updateContact({ id, ...credentials });
      toast.success('Successful editing contact!');
      refetch();
      onClose();
    } catch (error) {
      toast.error('Oops, something went wrong!');
    }
  }

  return (
    <>
      <ListItem mb={'16px'} display={'flex'} alignItems={'center'}>
        <ListIcon
          h={'clamp(30px, 4vw, 36px)'}
          w={'clamp(30px, 4vw, 36px)'}
          as={Avatar}
          color="green.500"
        />

        <Text fontSize={'clamp(1rem, 3vw, 1.6rem)'}>
          {contact.name}: {contact.number}
        </Text>
        <ButtonGroup justifyContent={'flex-end'} ml={'auto'} gap={'5%'}>
          <Button
            _hover={{
              bgColor: 'white',
              color: 'gray.800',
              borderColor: 'gray.400',
            }}
            w={'clamp(30px,8vw,80px)'}
            color={'gray.800'}
            backgroundColor="gray.100"
            borderWidth="2px"
            borderColor="white"
            type="button"
            onClick={onOpen}
            fontSize={'clamp(0.5rem, 1.5vw, 1.0rem)'}
          >
            <Text display={{ base: 'none', md: 'block' }}>Edit</Text>

            <EditIcon
              w={{ base: '2.2em' }}
              h={{ base: '2.2em' }}
              display={{ md: 'none' }}
            />
          </Button>
          <Button
            _hover={{
              bgColor: 'white',
              color: 'red.400',
              borderColor: 'red.400',
            }}
            w={'clamp(30px,8vw,80px)'}
            color={'white'}
            backgroundColor="red.400"
            borderWidth="2px"
            borderColor="white"
            type="button"
            onClick={handleDelete}
            fontSize={'clamp(0.5rem, 1.5vw, 1.0rem)'}
          >
            <Text display={{ base: 'none', md: 'block' }}>Delete</Text>

            <DeleteIcon
              w={{ base: '2.2em' }}
              h={{ base: '2.2em' }}
              display={{ md: 'none' }}
            />
          </Button>
        </ButtonGroup>
      </ListItem>
      <Modal
        size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay h={'100%'} minW={'414px'} />
        <ModalContent>
          <ModalHeader>Edit contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Formik
                initialValues={{
                  name: `${contact.name}`,
                  number: `${contact.number}`,
                }}
                validationSchema={schema}
                onSubmit={handleEdit}
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
                  <ModalFooter pb={'0'} gap={'5%'} pr={'0'}>
                    <Button type="submit">Edit contact</Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </Form>
              </Formik>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
      message:
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
      excludeEmptyString: true,
    })
    .required(),
  number: Yup.string()
    .matches(/^[\d\s()+-]+$/, {
      message:
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
      excludeEmptyString: true,
    })
    .required(),
});

Item.propTypes = {
  contact: PropTypes.object.isRequired,
};
