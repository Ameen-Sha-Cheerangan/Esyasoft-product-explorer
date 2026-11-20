import { useMemo, useState } from 'react';
import { ProductList } from '../components/ProductList';
import { ALL_CATEGORIES, ProductFilters } from '../components/ProductFilters';
import { categories, products } from '../data/products';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ProductsPage() {
  // Task 2: search text and selected category are React state.
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  useDocumentTitle('All Products');

  // Task 4: recompute only when the search text or category changes.
  // A product must pass both checks, so search and category filtering work together.
  const filteredProducts = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === ALL_CATEGORIES || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchText, selectedCategory]);

  return (
    <section>
      <h1>All Products</h1>
      <ProductFilters
        searchText={searchText}
        onSearchTextChange={setSearchText}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
      <p className="result-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>
      <ProductList products={filteredProducts} />
    </section>
  );
}
