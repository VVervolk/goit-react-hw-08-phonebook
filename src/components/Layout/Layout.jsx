import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { removeCredentials } from 'redux/auth/authSlice';
import { useLogOutMutation } from 'redux/auth/services';

export default function Layout() {
  const [logOut] = useLogOutMutation();
  const dispatch = useDispatch();

  async function handleClick() {
    await logOut();
    dispatch(removeCredentials());
    return;
  }
  return (
    <>
      <header>
        <div>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/register">Registration</NavLink>
            <NavLink to="/login">Log in</NavLink>
          </nav>
          <button onClick={handleClick} type="button">
            Logout
          </button>
        </div>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
