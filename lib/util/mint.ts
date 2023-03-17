import { Dispatch, SetStateAction } from 'react';

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

type Mintable = {
  seed: number;
  prefs: [[Choice, Choice], [Choice, Choice], [Choice, Choice]];
};

export type ReservationResponse = {
  proof: string[];
  mintable: Mintable[];
  airdrop: number;
  username: string;
  avatar: string;
};

export type Mint = {
  proof: string;
  mintable: Mintable;
};

export type Reservation = {
  mints: Mint[];
  airdrop: number;
  username: string;
  avatar: string;
};

export const requestReservation = (
  address: string,
  signature: string,
  setState: Dispatch<SetStateAction<Reservation | undefined>>
) =>
  fetch('/mintkeek/reservation', {
    method: 'POST',
    body: JSON.stringify({
      address,
      signature,
    }),
  })
    .then((res) => res.json())
    .then(({ proof, mintable, airdrop, username, avatar }: ReservationResponse) => {
      const mints: Mint[] = [];
      proof.forEach((p, i) => mints.push({ proof: p, mintable: mintable[i] }));
      setState({
        mints,
        airdrop,
        username,
        avatar,
      });
    });
