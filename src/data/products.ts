export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
};

export const products: Product[] = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', price: 799, description: 'Ergonomic 2.4 GHz mouse with a silent click and 12-month battery life.' },
  { id: 2, name: 'Mechanical Keyboard', category: 'Electronics', price: 3499, description: 'Tenkeyless keyboard with tactile switches and white backlight.' },
  { id: 3, name: 'Noise Cancelling Headphones', category: 'Electronics', price: 8999, description: 'Over-ear headphones with active noise cancellation and 30-hour battery.' },
  { id: 4, name: 'The Pragmatic Programmer', category: 'Books', price: 1299, description: 'Classic guide to practical software craftsmanship.' },
  { id: 5, name: 'Clean Code', category: 'Books', price: 999, description: 'Principles for writing readable, maintainable code.' },
  { id: 6, name: 'Cotton T-Shirt', category: 'Clothing', price: 499, description: 'Regular-fit 100% cotton crew-neck t-shirt.' },
  { id: 7, name: 'Denim Jacket', category: 'Clothing', price: 2499, description: 'Classic blue denim jacket with button front.' },
  { id: 8, name: 'Steel Water Bottle', category: 'Home', price: 649, description: 'Insulated 1-litre bottle that keeps drinks cold for 24 hours.' },
];

// Unique categories, derived from the data so the dropdown never goes out of sync.
export const categories: string[] = [...new Set(products.map((product) => product.category))];

// Compares as text so only an exact ID matches ("1" finds product 1; "1.0" or "0x1" do not).
export function findProductById(id: string | undefined): Product | undefined {
  return products.find((product) => String(product.id) === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
}
