import UserMenu from 'components/UserMenu/UserMenu';
import { Container } from 'components/others/Container.styled';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/selectors';
import { LeftLink, Nav, MenuLink } from './Layout.styled';

export default function Layout() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <Container>
        <header>
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <Nav>
              <LeftLink to="/">Home</LeftLink>
              <MenuLink to="/register">Registration</MenuLink>
              <MenuLink to="/login">Log in</MenuLink>
            </Nav>
          )}
        </header>
      </Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
