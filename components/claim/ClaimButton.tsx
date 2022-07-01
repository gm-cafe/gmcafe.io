import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Dispatch, SetStateAction } from 'react';
import { useAccount, useSigner } from 'wagmi';

const CLAIM_MESSAGE = 'Claim your Card';

type ClaimButtonProps = {
  setClaimSuccess: Dispatch<SetStateAction<boolean>>;
  discordId?: string;
};

const ClaimButton = ({ setClaimSuccess, discordId }: ClaimButtonProps) => {
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const connected = address && signer;

  const claim = async () => {
    const hash = await signer?.signMessage(CLAIM_MESSAGE);
    const response = await fetch('/api/claim', {
      method: 'POST',
      body: JSON.stringify({
        hash: hash,
        discord: discordId,
        message: CLAIM_MESSAGE,
      }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      console.error(message);
    } else {
      setClaimSuccess(true);
    }
  };

  return (
    <>
      {!connected && <ConnectButton />}
      {connected && (
        <button className="rounded-xl py-4 px-6 text-xl font-bold shadow-lg" onClick={claim}>
          Claim Card
        </button>
      )}
    </>
  );
};

export default ClaimButton;
