import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header>
        <div>
          <nav>
            <NavLink to="/">Home</NavLink>
          </nav>
        </div>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
