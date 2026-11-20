import { Link, useParams } from 'react-router-dom';
import { findProductById, formatPrice } from '../data/products';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ProductDetailsPage() {
  // Task 3: read the :id segment from the URL.
  const { id } = useParams();
  const product = findProductById(id);

  useDocumentTitle(product ? product.name : 'Product Not Found');

  if (!product) {
    return (
      <section className="not-found">
        <h1>Product not found</h1>
        <p>There is no product with ID "{id}".</p>
        <Link to="/products">Back to all products</Link>
      </section>
    );
  }

  return (
    <section className="product-details">
      <Link to="/products">&larr; Back to all products</Link>
      <span className="product-card__category">{product.category}</span>
      <h1>{product.name}</h1>
      <p className="product-details__price">{formatPrice(product.price)}</p>
      <p>{product.description}</p>
      <p className="product-details__id">Product ID: {product.id}</p>
    </section>
  );
}
