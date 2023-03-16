import { CollectionType, Keeku, Moo } from '../util/types';
import _moos from './moo.json';
import _keekus from './keeku.json';

// @ts-ignore
export const moos: Moo[] = _moos;

// @ts-ignore
export const keekus: Keeku[] = _keekus;

export const getTraitTypes = (type: CollectionType) => {
  const collection = type === 'moo' ? moos : type === 'keeku' ? keekus : [];

  return Array.from(
    new Set(
      collection
        .flatMap((element) => element.attributes.map((attribute) => attribute.trait_type))
        .filter((traitType) => !!traitType)
    )
  );
};
