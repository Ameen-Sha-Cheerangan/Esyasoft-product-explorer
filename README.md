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

## Approach

1. **Data first.** I defined the product type and an array of 8 products in `data/products.ts`, and derived the category list from that array so the dropdown always matches the data.
2. **Small, single-purpose components.** `ProductCard` shows one product, `ProductList` maps the products to cards, and `ProductFilters` holds the search box and dropdown. Each one gets its data through props.
3. **State in one place.** `ProductsPage` owns the search text and the selected category, and passes them down to `ProductFilters`.
4. **Routing.** A `Layout` route holds the shared header and an `<Outlet />`, with child routes for `/products`, `/products/:id`, a redirect from `/`, and a catch-all not-found page.
5. **Hooks.** A custom `useDocumentTitle` hook wraps `useEffect` so each page sets its tab title in one line. `useMemo` memoizes the filtered list.
6. **Verification.** One test file checks each task and fails if anything is logged to the console.

## Key design decision

**Only the user's inputs are stored in state; the filtered list is calculated from them.** `ProductsPage` keeps `searchText` and `selectedCategory` in `useState`, and the visible products are derived with `useMemo`. Storing the filtered list in state too would mean updating it every time either input changed, and the two could get out of sync. Deriving it gives a single source of truth, and makes "search and category work together" one combined condition in a single filter. Because the state lives in the page, `ProductFilters` only displays inputs and is easy to reuse.

## What I'd improve with more time

- **Keep the filters in the URL** with `useSearchParams`. At the moment, filtering, opening a product and pressing Back resets the filters. Storing them in the URL would keep them and make filtered views shareable.
- **Load products from an API**, with loading and error states, instead of a hard-coded array.
- **Debounce the search** if the product list grew large.
- **UI additions:** product images, sorting by price, and pagination.
