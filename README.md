# Product Explorer

A small React app to browse products, search by name, filter by category, and view product details.


## Screenshots

**Product listing (`/products`)**

![Product listing](screenshots/product%20listing.png)

**Product details (`/products/2`)**

![Product details](screenshots/product%20details%20page.png)

## Run

```
npm install
npm run dev     # open the URL shown, e.g. http://localhost:5173
npm test        # 12 automated checks covering Tasks 1-5
```

## Where each task is implemented

| Task | What | Files |
|---|---|---|
| 1. Product listing | 8 products (`id`, `name`, `category`, `price`); list rendered with `.map()` and `key={product.id}`; `ProductCard` receives the product through props | `src/data/products.ts`, `src/components/ProductList.tsx`, `src/components/ProductCard.tsx` |
| 2. Search and filter | Search input and category dropdown held in `useState`; a product must match both | `src/pages/ProductsPage.tsx`, `src/components/ProductFilters.tsx` |
| 3. Product details | `createBrowserRouter` with `/products` and `/products/:id`; `Link`/`NavLink` navigation; `useParams()` reads the ID; "Product not found" message for unknown IDs; `/` redirects to `/products`; catch-all page for unknown URLs | `src/routes.tsx`, `src/App.tsx`, `src/pages/ProductDetailsPage.tsx`, `src/components/Layout.tsx` |
| 4. Hooks | `useEffect()` sets the document title per page (in the `useDocumentTitle` hook); `useMemo()` memoizes the filtered list | `src/hooks/useDocumentTitle.ts`, `src/pages/ProductsPage.tsx` |
| 5. Code quality | One component per file, grouped into `components/`, `pages/`, `data/`, `hooks/`; TypeScript strict mode; tests fail on any console error or warning | `src/App.test.tsx` |

## Structure

```
src/
  data/products.ts            product data and helpers
  hooks/useDocumentTitle.ts   useEffect for the page title
  components/
    Layout.tsx                header + <Outlet />
    ProductList.tsx           maps products to cards
    ProductCard.tsx           a single product
    ProductFilters.tsx        search input + category dropdown
  pages/
    ProductsPage.tsx          /products
    ProductDetailsPage.tsx    /products/:id
    NotFoundPage.tsx          any other URL
  routes.tsx                  route tree
  App.tsx                     router setup
  main.tsx                    entry point
```
