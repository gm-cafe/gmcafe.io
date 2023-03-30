import { Dispatch, SetStateAction } from 'react';
import { toastError } from './toast';

export type Choice =
  | 'animal'
  | 'autumn'
  | 'bakery'
  | 'battle'
  | 'casualClothing'
  | 'creative'
  | 'drinks'
  | 'fantasy'
  | 'feminine'
  | 'formalClothing'
  | 'freshFood'
  | 'fun'
  | 'gaming'
  | 'kids'
  | 'masculine'
  | 'music'
  | 'otherFood'
  | 'sport'
  | 'spring'
  | 'summer'
  | 'sweets'
  | 'winter';

export const emoji: Record<Choice, string> = {
  animal: '🐾',
  autumn: '🍂',
  bakery: '🥐',
  battle: '⚔️',
  casualClothing: '👕',
  creative: '🎨',
  drinks: '☕',
  fantasy: '✨',
  feminine: '🎀',
  formalClothing: '👔',
  freshFood: '🍉',
  fun: '🤡',
  gaming: '🎮',
  kids: '🧸',
  masculine: '🎩',
  music: '🎵',
  otherFood: '🍕',
  sport: '⚽',
  spring: '🍃',
  summer: '☀️',
  sweets: '🍬',
  winter: '❄️',
};

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
  prefs?: Options[];
  airdrop: number;
  username: string;
  avatar: string;
  packed: number;
};

export const requestReservation = (
  address: string,
  signature: string,
  setState: Dispatch<SetStateAction<Reservation | undefined>>,
  setError: Dispatch<SetStateAction<APIError | undefined>>
) =>
  fetch('https://api.gmcafe.io/mint/reservation', {
    method: 'POST',
    body: JSON.stringify({
      address,
      sig: signature,
    }),
  })
    .then((res) => res.json())
    .then((res: Reservation & { error: string }) =>
      res.error ? setError('noReservation') : setState(res)
    )
    .catch(toastError);

export type Status = {
  minted: number;
  dropped: number;
  supply: number;
  priceWei: string;
  publicMax: number;
  reserved: number;
  phase: string;
};

export const requestStatus = (setState: Dispatch<SetStateAction<Status | undefined>>) =>
  fetch('https://api.gmcafe.io/mint/status')
    .then((res) => res.json())
    .then((res: Status) => setState(res))
    .catch(toastError);

export type APIError = 'noReservation';

export type KeekuInfo = {
  owner: `0x${string}`;
  block: number;
  transfers: number;
  tag: number;
  locked: boolean;
  pref: number;
  token: number;
};
