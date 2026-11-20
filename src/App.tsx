import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

// The future flags opt in to React Router v7 behaviour now, which also stops
// v6 from printing "future flag" warnings in the console.
const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export function App() {
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}
