import { CollectionType, Keeku } from '../util/types';
import _keekus from './keeku.json';

// @ts-ignore
export const keekus: Keeku[] = _keekus;

export const getTraitTypes = (type: CollectionType) => {
  const collection = type === 'keek' ? keekus : [];

  return Array.from(
    new Set(
      collection
        .flatMap((element) => element.attributes.map((attribute) => attribute.trait_type))
        .filter((traitType) => !!traitType)
    )
  );
};
