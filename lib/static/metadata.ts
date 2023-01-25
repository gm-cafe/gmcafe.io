import { Moo } from '../util/types';
import _metadata from './metadata.json';

// @ts-ignore
const metadata: Moo[] = _metadata;

export const traitTypes = Array.from(
  new Set(
    metadata.flatMap((element) => element.attributes.map((attribute) => attribute.trait_type))
  )
);

export default metadata;
