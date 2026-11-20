import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { products } from './data/products';

// Same route tree as the app. MemoryRouter is used because the data router's
// navigation does not run under jsdom.
function AppRoutes() {
  return useRoutes(routes);
}

function renderAt(url: string) {
  return render(
    <MemoryRouter initialEntries={[url]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

const productNames = () => screen.queryAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

let consoleError: MockInstance;
let consoleWarn: MockInstance;
beforeEach(() => {
  consoleError = vi.spyOn(console, 'error');
  consoleWarn = vi.spyOn(console, 'warn');
});
afterEach(() => {
  // Task 5: no console errors or warnings (for example, missing keys) on any page.
  expect(consoleError).not.toHaveBeenCalled();
  expect(consoleWarn).not.toHaveBeenCalled();
  consoleError.mockRestore();
  consoleWarn.mockRestore();
  cleanup();
});

describe('Task 1 - product listing', () => {
  it('renders every product with a details link', () => {
    renderAt('/products');
    expect(products.length).toBeGreaterThanOrEqual(6);
    expect(productNames()).toEqual(products.map((product) => product.name));
    expect(screen.getAllByRole('link', { name: 'View details' })[0]).toHaveAttribute('href', '/products/1');
  });
});

describe('Task 2 - search and filter', () => {
  it('searches by name, ignoring case', () => {
    renderAt('/products');
    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'CLEAN' } });
    expect(productNames()).toEqual(['Clean Code']);
  });

  it('filters by category', () => {
    renderAt('/products');
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Clothing' } });
    expect(productNames()).toEqual(['Cotton T-Shirt', 'Denim Jacket']);
  });

  it('combines search and category', () => {
    renderAt('/products');
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Electronics' } });
    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'key' } });
    expect(productNames()).toEqual(['Mechanical Keyboard']);

    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'jacket' } });
    expect(productNames()).toEqual([]);
    expect(screen.getByText('No products match your search.')).toBeInTheDocument();
  });
});

describe('Task 3 - routing', () => {
  it('redirects / to /products', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1, name: 'All Products' })).toBeInTheDocument();
  });

  it('shows product details for /products/:id', () => {
    renderAt('/products/3');
    expect(screen.getByRole('heading', { level: 1, name: 'Noise Cancelling Headphones' })).toBeInTheDocument();
  });

  it.each(['99', 'abc', '0x1', '1.0'])('shows a not-found message for /products/%s', (id) => {
    renderAt(`/products/${id}`);
    expect(screen.getByRole('heading', { name: 'Product not found' })).toBeInTheDocument();
  });

  it('clicking "View details" opens the product page', () => {
    renderAt('/products');
    fireEvent.click(screen.getAllByRole('link', { name: 'View details' })[4]);
    expect(screen.getByRole('heading', { level: 1, name: 'Clean Code' })).toBeInTheDocument();
  });
});

describe('Task 4 - document title', () => {
  it('updates for each page', () => {
    renderAt('/products');
    expect(document.title).toBe('All Products | Product Explorer');
    cleanup();

    renderAt('/products/1');
    expect(document.title).toBe('Wireless Mouse | Product Explorer');
    cleanup();

    renderAt('/products/99');
    expect(document.title).toBe('Product Not Found | Product Explorer');
  });
});
