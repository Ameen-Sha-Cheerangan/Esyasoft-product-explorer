import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('Page Not Found');

  return (
    <section className="not-found">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/products">Go to all products</Link>
    </section>
  );
}
