import { createContext, useContext } from 'react';
import { EntryContextProps } from '../util/types';

const defaultEntryContext: EntryContextProps = {
  paginated: [],
  metadata: [],
  type: 'moo',
  setType: () => null,
  displayName: 'Moo',
};

export const EntryContext = createContext(defaultEntryContext);

export const useEntryContext = () => useContext(EntryContext);
