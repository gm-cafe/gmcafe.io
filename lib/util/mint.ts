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

export const finalStatus: Status = {
  priceWei: '36900000000000000',
  dropped: 387,
  minted: 2946,
  reserved: 387,
  supply: 3333,
  publicMax: 5,
  phase: 'Closed',
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

export const requestDrop = (
  token: number,
  setState: Dispatch<SetStateAction<Options | undefined>>
) =>
  fetch('https://api.gmcafe.io/mint/drop', {
    method: 'POST',
    body: JSON.stringify({ token: token }),
  })
    .then((res) => res.json())
    .then((json) => setState(json))
    .catch(toastError);

export const preparePrefs = (preferences: Preference[], options?: Options[]) =>
  preferences.map((preference, idx) => {
    if (!options || preference.every((p) => p === undefined)) {
      return 0;
    }

    const option = options[idx];

    const [p1, p2, p3] = preference;
    const [o1, o2, o3] = option;

    const t1 = p1 === o1[0] ? 0 : 1;
    const t2 = p2 === o2[0] ? 0 : 2;
    const t3 = p3 === o3[0] ? 0 : 4;

    return 8 + t1 + t2 + t3;
  });
