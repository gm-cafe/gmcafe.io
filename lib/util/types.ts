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
  name: string;
  description: string;
  attributes: Attribute[];
  image: string;
  info: MooInfo;
};
