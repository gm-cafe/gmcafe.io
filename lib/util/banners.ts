import { Group } from 'konva/lib/Group';
import { Image } from 'konva/lib/shapes/Image';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { RefObject } from 'react';

export type Asset = {
  src: string;
  width: number;
  x: number;
  y: number;
  flip: boolean;
  deleted: boolean;
  ref: RefObject<Image>;
  groupRef: RefObject<Group>;
  tfRef: RefObject<Transformer>;
};
