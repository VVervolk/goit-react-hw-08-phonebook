import UserMenu from 'components/UserMenu/UserMenu';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/selectors';

export default function Layout() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <header>
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/register">Registration</NavLink>
            <NavLink to="/login">Log in</NavLink>
          </nav>
        )}
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
