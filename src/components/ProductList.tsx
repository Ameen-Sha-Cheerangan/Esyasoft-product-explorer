import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

type ProductListProps = {
  products: Product[];
};

// Task 1: renders the list with .map() and a unique key per product.
export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p className="empty-message">No products match your search.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
