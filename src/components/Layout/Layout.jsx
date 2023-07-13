import UserMenu from 'components/UserMenu/UserMenu';
import { Container } from 'components/others/Container.styled';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/selectors';
import { LeftLink, Nav, MenuLink } from './Layout.styled';
import { Spinner } from '@chakra-ui/react';

export default function Layout() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <header>
        <Container>
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <Nav>
              <LeftLink to="/">Home</LeftLink>
              <MenuLink to="/register">Registration</MenuLink>
              <MenuLink to="/login">Log in</MenuLink>
            </Nav>
          )}
        </Container>
      </header>
      <Suspense
        fallback={
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.600"
            size="xl"
          />
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
}
