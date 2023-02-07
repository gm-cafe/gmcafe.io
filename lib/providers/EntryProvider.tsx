import metadata from '../static/metadata';
import { ProviderProps } from '../util/types';
import { EntryContext } from './EntryContext';
import { useFilterContext } from './FilterContext';

export const EntryProvider = ({ children }: ProviderProps) => {
  const { filters, count, search } = useFilterContext();

  const searches = search.split(' ');

  const entries = metadata
    .filter(({ attributes }) =>
      Object.entries(filters).every(([type, values]) => {
        // removing filters can result in an empty set
        if (values.size === 0) {
          return true;
        }

        const trait = attributes.find((attribute) => attribute.trait_type === type);

        return trait ? values.has(trait.value) : false;
      })
    )
    .filter(
      ({ attributes }) =>
        // Search is empty
        searches.length === 0 ||
        // Attribute value is string and contains search
        searches.every((s) =>
          attributes.some(
            (attribute) =>
              typeof attribute.value === 'string' && attribute.value.toLowerCase().includes(s)
          )
        ) ||
        searches.every((s) =>
          // Trait type contains search and value is not none
          attributes.some(
            (attribute) =>
              attribute.trait_type.toLowerCase().includes(s) && attribute.value !== 'None'
          )
        )
    )
    .slice(0, count);

  return <EntryContext.Provider value={{ entries: entries }}>{children}</EntryContext.Provider>;
};
