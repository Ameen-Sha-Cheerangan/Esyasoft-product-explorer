import { NavLink, Outlet } from 'react-router-dom';

// Shared header; the current route's page renders in <Outlet />.
export function Layout() {
  return (
    <>
      <header className="site-header">
        <NavLink to="/products" className="site-header__brand">
          Product Explorer
        </NavLink>
        <nav>
          <NavLink to="/products" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            All products
          </NavLink>
        </nav>
      </header>
      <main className="page">
        <Outlet />
      </main>
    </>
  );
}
