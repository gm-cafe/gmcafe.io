import { createContext, useContext } from 'react';
import { EntryContextProps } from '../util/types';

const defaultEntryContext: EntryContextProps = {
  entries: [],
};

export const EntryContext = createContext(defaultEntryContext);

export const useEntryContext = () => useContext(EntryContext);
