export const ALL_CATEGORIES = 'All';

type ProductFiltersProps = {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
};

// Task 2: controlled search input and category dropdown. The state lives in ProductsPage.
export function ProductFilters({
  searchText,
  onSearchTextChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: ProductFiltersProps) {
  return (
    <div className="filters">
      <label className="filters__field">
        Search
        <input
          type="search"
          placeholder="Search by product name"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
        />
      </label>
      <label className="filters__field">
        Category
        <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value={ALL_CATEGORIES}>All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
