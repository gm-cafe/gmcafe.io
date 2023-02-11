import { useState } from 'react';
import { ProviderProps } from '../util/types';
import { FilterContext } from './FilterContext';

const PAGE_SIZE = 60;

export const FilterProvider = ({ children }: ProviderProps) => {
  const [filters, setFilters] = useState<Record<string, Set<string>>>({});
  const [count, setCount] = useState(PAGE_SIZE);
  const [search, setSearch] = useState('');

  const addFilter = (type: string, value: string) => {
    const values = filters[type];

    if (values) {
      const set = new Set(values.values());
      set.add(value);

      setFilters({
        ...filters,
        [type]: set,
      });
    } else {
      setFilters({
        ...filters,
        [type]: new Set([value]),
      });
    }
  };

  const removeFilter = (type: string, value: string) => {
    const values = filters[type];

    if (values) {
      const set = new Set(values.values());
      set.delete(value);

      const newFilters = { ...filters, [type]: set };
      set.size === 0 && delete newFilters[type];
      setFilters(newFilters);
    } else {
      console.warn(`Failed to remove ${value} of type ${type}`);
    }
  };

  const toggleFilters = (type: string, values: string[]) => {
    const filterValues = filters[type];
    const allSelected = filterValues && values.every((value) => filterValues.has(value));

    if (filterValues) {
      const set = new Set(filterValues.values());

      values.forEach((value) => (allSelected ? set.delete(value) : set.add(value)));

      const newFilters = { ...filters, [type]: set };
      set.size === 0 && delete newFilters[type];
      setFilters(newFilters);
    } else {
      setFilters({
        ...filters,
        [type]: new Set(values),
      });
    }
  };

  const loadMore = () => setCount(count + PAGE_SIZE);

  const clear = () => {
    setFilters({});
    setSearch('');
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        addFilter,
        removeFilter,
        toggleFilters,
        count,
        loadMore,
        search,
        setSearch,
        clear,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
