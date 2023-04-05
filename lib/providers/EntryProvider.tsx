import { isAddress } from 'ethers/lib/utils';
import { useState } from 'react';
import { keekus } from '../static/metadata';
import { CollectionType, ProviderProps } from '../util/types';
import useAddressToMooIds from '../util/useAddressToMoos';
import { EntryContext } from './EntryContext';
import { useFilterContext } from './FilterContext';

export const EntryProvider = ({ children, metadata }: ProviderProps) => {
  const { moos } = metadata;

  const { filters, count, search } = useFilterContext();
  const [type, setType] = useState<CollectionType>('gmoo');

  const displayName = type === 'gmoo' ? 'Moo' : 'Keeku';

  const mooIds = useAddressToMooIds(search);

  const searches = search.split(' ');

  const collection = type === 'gmoo' ? moos : type === 'keek' ? keekus : [];
  const entries = collection
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

  return (
    <EntryContext.Provider
      value={{
        metadata: entries,
        paginated: entries.slice(0, count),
        type,
        setType,
        displayName,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};
