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
  owner: string;
  tag: number;
  token: string;
  transfers: number;
};

type Shared = {
  id: number;
  name: string;
  description: string;
  attributes: Attribute[];
  image: string;
};

export type Moo = Shared & {
  info: MooInfo;
};

export type Keeku = Shared;

export type HerdInfo = {
  locked: boolean;
  moo: number;
  tag: number;
  transfers: number;
  block: number;
  owner: string;
};

export type HerdInfoByOwner = {
  owner: string;
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
  metadata: Moo[];
  paginated: Moo[];
};
