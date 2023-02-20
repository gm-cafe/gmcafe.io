import { Keeku, Moo } from '../util/types';
import _moos from './moo.json';
import _keekus from './rawr.json';

// @ts-ignore
export const moos: Moo[] = _moos;

// @ts-ignore
export const keekus: Keeku[] = _keekus;

export const traitTypes = Array.from(
  new Set(
    moos
      .flatMap((element) => element.attributes.map((attribute) => attribute.trait_type))
      .filter((traitType) => !!traitType)
  )
);
