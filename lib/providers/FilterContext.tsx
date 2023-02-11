import { createContext, useContext } from 'react';
import { FilterContextProps } from '../util/types';

const defaultFilterContext: FilterContextProps = {
  filters: {},
  addFilter: (_type: string, _value: string) => null,
  removeFilter: (_type: string, _value: string) => null,
  toggleFilters: (_type: string, _values: string[]) => null,
  count: 0,
  loadMore: () => null,
  search: '',
  setSearch: () => null,
  clear: () => null,
};

export const FilterContext = createContext(defaultFilterContext);

export const useFilterContext = () => useContext(FilterContext);
