import { useFilterContext } from '../../lib/providers/FilterContext';

const Search = () => {
  const { search, setSearch } = useFilterContext();

  return (
    <input
      className="mb-4 rounded border px-2 py-1 text-purple focus:outline-none"
      value={search}
      type="text"
      placeholder="Search..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default Search;
