import { useDispatch, useSelector } from 'react-redux';
import { removeCredentials } from 'redux/auth/authSlice';
import { useLogOutMutation } from 'redux/auth/services';
import { selectUser } from 'redux/selectors';
import { toast } from 'react-toastify';
import { LeftLink, Nav } from 'components/Layout/Layout.styled';
import { Avatar, Button } from '@chakra-ui/react';
import { UserName, Usermenu } from './UserMenu.styled';

export default function UserMenu() {
  const [logOut, { reset }] = useLogOutMutation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser).name;

  async function handleClick() {
    await logOut();
    dispatch(removeCredentials());
    reset();
    toast.success('Successful logout!');

    return;
  }

  return (
    <>
      <Nav>
        <LeftLink>Contacts</LeftLink>
        <Usermenu>
          <Avatar
            mr={'8px'}
            size={{ base: 'sm', md: 'md' }}
            name={user}
            src="https://bit.ly/broken-link"
          />
          <UserName>{user}</UserName>
          <Button
            _hover={{
              bgColor: 'white',
              color: 'blue.600',
              borderColor: 'blue.600',
            }}
            fontSize={'clamp(1rem, 2.5vw, 1.5rem)'}
            h={'50px'}
            w={'clamp(4rem, 10vw, 7rem)'}
            ml={'50px'}
            color={'white'}
            backgroundColor="blue.600"
            onClick={handleClick}
            type="button"
            borderWidth="2px"
            borderColor="white"
          >
            Logout
          </Button>
        </Usermenu>
      </Nav>
    </>
  );
}
