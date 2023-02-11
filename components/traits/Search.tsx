import { useFilterContext } from '../../lib/providers/FilterContext';

const Search = () => {
  const { search, setSearch } = useFilterContext();

  return (
    <input
      className="mb-4 rounded border-2 border-purple-light px-2 py-2.5 text-purple placeholder:text-purple focus:outline-none"
      value={search}
      type="text"
      placeholder="Search..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default Search;
