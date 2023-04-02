import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Connect from '../components/mint/Connect';
import Error from '../components/mint/Error';
import Explanation from '../components/mint/Explanation';
import Harold from '../components/mint/Harold';
import Mint from '../components/mint/Mint';
import Preferences from '../components/mint/Preferences';
import Stepper from '../components/mint/Stepper';
import Story from '../components/mint/Story';
import Success from '../components/mint/Success';
import {
  APIError,
  Choice,
  finalStatus,
  Preference,
  requestReservation,
  requestStatus,
  Reservation,
  Status,
} from '../lib/util/mint';

const MintPage: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [signature, setSignature] = useState<string>();

  const [mintStep, setMintStep] = useState(0);
  const [preferences, setPreferences] = useState<Preference[]>([[undefined, undefined, undefined]]);

  const [status, setStatus] = useState<Status>(finalStatus);
  const [reservation, setReservation] = useState<Reservation | undefined>();
  const [error, setError] = useState<APIError | undefined>();

  const [mints, setMints] = useState(1);

  const advance = (steps = 1) => setMintStep(mintStep + steps);
  const choose = (mint: number, idx: 0 | 1 | 2, choice: Choice) => {
    setPreferences([
      ...preferences.slice(0, mint),
      [
        idx === 0 ? choice : preferences[mint][0],
        idx === 1 ? choice : preferences[mint][1],
        idx === 2 ? choice : preferences[mint][2],
      ],
      ...preferences.slice(mint + 1, preferences.length),
    ]);
  };
  const undoMint = () => {
    advance(-2);
    setMints(1);
    setPreferences([[undefined, undefined, undefined]]);
  };

  const maxMints =
    reservation && status
      ? reservation.packed === 0
        ? status.publicMax
        : (reservation.packed >> 1) & 0xf
      : 1;

  // Resets states when user changes wallet
  useEffect(() => {
    setSignature(undefined);
    setReservation(undefined);
    setPreferences([[undefined, undefined, undefined]]);
    setMints(1);
    setMintStep(0);
    setError(undefined);
  }, [address]);

  // Fetch /reservation when user signs 'RAWR!' message
  useEffect(() => {
    address &&
      signature &&
      !reservation &&
      requestReservation(address, signature, setReservation, setError);
  }, [signature, reservation, setReservation]);

  // Preemptively fill preferences when mint count changes
  useEffect(() => {
    mints !== preferences.length &&
      setPreferences(Array.from(Array(mints)).map(() => [undefined, undefined, undefined]));
  }, [mints, preferences]);

  return (
    <div className="flex h-screen flex-col items-center bg-pink-background px-3 pt-32 pb-12 md:px-4 md:pt-40">
      <div className="mx-auto flex h-full w-full max-w-screen-sm flex-grow flex-col items-center justify-center">
        {[0, 5].includes(mintStep) && (
          <div className="w-72 md:w-96">
            <Image src="/mint/banner.png" width={600} height={150} alt="Banner" />
          </div>
        )}
        {!error && mintStep < 5 && <Stepper index={mintStep} />}
        {error && <Error error={error} />}
        {!error && mintStep === 0 && (
          <Connect
            advance={advance}
            signature={signature}
            setSignature={setSignature}
            isConnected={isConnected}
            status={status}
          />
        )}
        {!error && mintStep === 1 && <Story advance={advance} />}
        {!error && mintStep === 2 && signature && reservation && address && (
          <Explanation
            advance={advance}
            mints={mints}
            setMints={setMints}
            maxMints={maxMints}
            signature={signature}
            address={address}
            packed={reservation.packed}
            disableInfluence={!reservation.prefs}
          />
        )}
        {!error && mintStep === 3 && reservation && reservation.prefs && (
          <Preferences
            preferences={preferences}
            choose={choose}
            options={reservation.prefs}
            advance={advance}
          />
        )}
        {!error && mintStep === 4 && status && reservation && (
          <Mint
            preferences={preferences}
            reservation={reservation}
            priceWei={status.priceWei}
            advance={advance}
            mints={mints}
            maxMints={maxMints}
            undo={undoMint}
          />
        )}
        {!error && mintStep === 5 && address && <Success address={address} />}
        {!error && <Harold mintStep={mintStep} />}
      </div>
    </div>
  );
};

export default MintPage;

export const getServerSideProps = () => {
  return {
    props: {
      title: 'Keekusaur Adoption Cave',
      metaImage: '/meta_image_keeku.png',
      metaDescription: 'Adopt your tender Keekusaur ✨',
    },
  };
};
