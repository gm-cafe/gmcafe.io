import { PATRON_ROLE_ID } from '.';
import { GuildMember } from './discord';

type CLAIM_STATES =
  | 'DC_NOT_CONNECTED'
  | 'DC_NOT_PATRON'
  | 'CARD_NOT_CLAIMED'
  | 'CARD_CLAIMED'
  | 'UNEXPECTED_ERROR';

export const stateMachine = (guildMember: GuildMember, stamps: number): CLAIM_STATES => {
  const {
    roles,
    user: { id },
  } = guildMember;
  const isPatron = roles.includes(PATRON_ROLE_ID);

  if (!id) {
    return 'DC_NOT_CONNECTED';
  } else if (id && !isPatron) {
    return 'DC_NOT_PATRON';
  } else if (id && isPatron && stamps < 0) {
    return 'CARD_NOT_CLAIMED';
  } else if (id && isPatron && stamps >= 0) {
    return 'CARD_CLAIMED';
  } else {
    return 'UNEXPECTED_ERROR';
  }
};

export type CardResponse = {
  stamps: number;
  address?: string;
};

export const defaultCardResponse: CardResponse = {
  stamps: -1,
};
