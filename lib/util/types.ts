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

export type Moo = {
  id: number;
  name: string;
  description: string;
  attributes: Attribute[];
  image: string;
  info: MooInfo;
};

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
  count: number;
  loadMore: () => void;
  search: string;
  setSearch: (_search: string) => void;
};

export type ProviderProps = {
  children: ReactNode | ReactNode[];
};

export type EntryContextProps = {
  entries: Moo[];
};
