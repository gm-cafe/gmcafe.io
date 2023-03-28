import { Dispatch, SetStateAction } from 'react';
import { toastError } from './toast';

export type Choice =
  | 'animals'
  | 'autumn'
  | 'baby'
  | 'bakery'
  | 'battle'
  | 'casual'
  | 'creative'
  | 'drinks'
  | 'fantasy'
  | 'feminine'
  | 'formal'
  | 'fresh_food'
  | 'fun'
  | 'gaming'
  | 'masculine'
  | 'music'
  | 'other_food'
  | 'sports'
  | 'spring'
  | 'summer'
  | 'sweets'
  | 'winter';

export type Preference = [Choice | undefined, Choice | undefined, Choice | undefined];

export type Option = [Choice, Choice];
export type Options = [Option, Option, Option];

export const toName = (choice: Choice) =>
  choice
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

export type Reservation = {
  proof: string[];
  prefs: Options[];
  airdrop: number;
  username: string;
  avatar: string;
  index: number;
};

export const requestReservation = (
  address: string,
  signature: string,
  setState: Dispatch<SetStateAction<Reservation | undefined>>
) =>
  fetch('https://api.gmcafe.io/mint/reservation', {
    method: 'POST',
    body: JSON.stringify({
      address,
      sig: signature,
    }),
  })
    .then((res) => res.json())
    .then((res: Reservation) => setState(res))
    .catch(toastError);

export type Status = {
  minted: number;
  airdrop: number;
  supply: number;
  priceWei: string;
};

export const requestStatus = (setState: Dispatch<SetStateAction<Status | undefined>>) =>
  fetch('https://api.gmcafe.io/mint/status')
    .then((res) => res.json())
    .then((res: Status) => setState(res))
    .catch(toastError);
