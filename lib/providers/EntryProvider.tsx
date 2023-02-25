import { isAddress } from 'ethers/lib/utils';
import { moos } from '../static/metadata';
import shuffle from '../util/shuffle';
import { ProviderProps } from '../util/types';
import useAddressToMooIds from '../util/useAddressToMoos';
import { EntryContext } from './EntryContext';
import { useFilterContext } from './FilterContext';

export const EntryProvider = ({ children }: ProviderProps) => {
  const { filters, count, search } = useFilterContext();

  const mooIds = useAddressToMooIds(search);

  const searches = search.split(' ');

  const entries = moos
    .filter(
      ({ id }) =>
        search.length === 0 ||
        searches.every((s) => isNaN(Number(s))) ||
        // Check every searches is number, otherwise '29 ab' will still return 29 and confuse users
        (searches.every((s) => !isNaN(Number(s))) && searches.some((s) => parseInt(s) === id))
    )
    .filter(({ id }) => mooIds.length === 0 || mooIds.includes(id))
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
        // Search is an ENS query
        (search.includes('.eth') && mooIds.length > 0) ||
        // Search is an address
        (isAddress(search.toLowerCase()) && mooIds.length > 0) ||
        // Search is empty
        search.length === 0 ||
        // Search is id
        !searches.every((s) => isNaN(Number(s))) ||
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
              attribute.trait_type?.toLowerCase().includes(s) && attribute.value !== 'None'
          )
        )
    );

  const shuffledEntries = shuffle(entries);

  return (
    <EntryContext.Provider
      value={{
        metadata: shuffledEntries,
        paginated: shuffledEntries.slice(0, count),
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};
