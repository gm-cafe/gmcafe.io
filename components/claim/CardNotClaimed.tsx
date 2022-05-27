import { Dispatch, SetStateAction, useState } from 'react';
import { CardResponse } from '../../lib/util/claim';
import ClaimButton from './ClaimButton';

type CardNotClaimedProps = {
  setCoffeeCard: Dispatch<SetStateAction<CardResponse>>;
  discordId?: string;
};

const CardNotClaimed = ({ setCoffeeCard, discordId }: CardNotClaimedProps) => {
  const [claimSuccess, setClaimSuccess] = useState(false);

  const coffeeCard: CardResponse = {
    stamps: 0,
  };

  return (
    <>
      {!claimSuccess && <ClaimButton discordId={discordId} setClaimSuccess={setClaimSuccess} />}
      {claimSuccess && (
        <>
          <h1 className="mb-4 text-4xl font-bold">Here is your card!</h1>
          <button
            className="rounded-xl py-4 px-6 text-xl font-bold shadow-lg"
            onClick={() => setCoffeeCard(coffeeCard)}
          >
            Click to view your card
          </button>
        </>
      )}
    </>
  );
};

export default CardNotClaimed;
