import { ReactNode } from 'react';

export type Asset = {
  name: string;
  imageUrl: string;
  token: string;
};

export type Attribute = {
  trait_type: string;
  value: string;
};

type MooInfo = {
  bgColor: string;
  block: number;
  fgColor: string;
  owner: `0x${string}`;
  tag: number;
  token: string;
  transfers: number;
};

export type Token = {
  id: number;
  name: string;
  description: string;
  attributes: Attribute[];
  image: string;
};

export type Moo = Token & {
  info: MooInfo;
};

export type Keeku = Token;

export type HerdInfo = {
  locked: boolean;
  moo: number;
  tag: number;
  transfers: number;
  block: number;
  owner: `0x${string}`;
};

export type HerdInfoByOwner = {
  owner: `0x${string}`;
  herd: HerdInfo[];
};

export type FilterContextProps = {
  filters: Record<string, Set<string>>;
  addFilter: (_type: string, _value: string) => void;
  removeFilter: (_type: string, _value: string) => void;
  toggleFilters: (_type: string, _values: string[]) => void;
  count: number;
  loadMore: () => void;
  search: string;
  setSearch: (_search: string) => void;
  clear: () => void;
};

export type ProviderProps = {
  children: ReactNode | ReactNode[];
};

export type EntryContextProps = {
  metadata: Token[];
  paginated: Token[];
  type: CollectionType;
  setType: (_type: CollectionType) => void;
  displayName: string;
};

export type CollectionType = 'moo' | 'keeku';
