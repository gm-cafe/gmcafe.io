import { Moo } from '../util/types';
import _moos from './moo.json';

// @ts-ignore
export const moos: Moo[] = _moos;

export const traitTypes = Array.from(
  new Set(
    moos
      .flatMap((element) => element.attributes.map((attribute) => attribute.trait_type))
      .filter((traitType) => !!traitType)
  )
);
