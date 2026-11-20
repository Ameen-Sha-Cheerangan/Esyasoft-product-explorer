import { Link } from 'react-router-dom';
import { Product, formatPrice } from '../data/products';

type ProductCardProps = {
  product: Product;
};

// Task 1: shows one product; details arrive through props.
export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <span className="product-card__category">{product.category}</span>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">{formatPrice(product.price)}</p>
      <Link to={`/products/${product.id}`} className="product-card__link">
        View details
      </Link>
    </article>
  );
}
