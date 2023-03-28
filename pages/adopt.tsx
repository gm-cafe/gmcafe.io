import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Connect from '../components/mint/Connect';
import Explanation from '../components/mint/Explanation';
import Harold from '../components/mint/Harold';
import Mint from '../components/mint/Mint';
import Preferences from '../components/mint/Preferences';
import Stepper from '../components/mint/Stepper';
import Story from '../components/mint/Story';
import Success from '../components/mint/Success';
import {
  Choice,
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

  const [status, setStatus] = useState<Status | undefined>();
  const [reservation, setReservation] = useState<Reservation | undefined>();

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

  useEffect(() => {
    setSignature(undefined);
    setReservation(undefined);
    setPreferences([[undefined, undefined, undefined]]);
    setMints(1);
    setMintStep(0);
  }, [address]);

  useEffect(() => {
    !status && requestStatus(setStatus);
  }, [status]);

  useEffect(() => {
    address && signature && !reservation && requestReservation(address, signature, setReservation);
  }, [address, signature, reservation, setReservation]);

  useEffect(() => {
    mints !== preferences.length &&
      setPreferences(Array.from(Array(mints)).map(() => [undefined, undefined, undefined]));
  }, [mints, preferences]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-pink-background px-4 pt-32 pb-12 md:pt-40">
      <div className="mx-auto flex w-full max-w-screen-sm flex-grow flex-col items-center justify-center">
        <div className="w-72 md:w-96">
          <Image src="/mint/banner.png" width={600} height={150} alt="Banner" />
        </div>
        {mintStep < 5 && <Stepper index={mintStep} />}
        {mintStep === 0 && (
          <Connect
            advance={advance}
            signature={signature}
            setSignature={setSignature}
            isConnected={isConnected}
          />
        )}
        {mintStep === 1 && <Story advance={advance} />}
        {mintStep === 2 && signature && reservation && (
          <Explanation
            advance={advance}
            mints={mints}
            setMints={setMints}
            maxMints={reservation.prefs.length || 1}
            signature={signature}
            index={reservation.index}
          />
        )}
        {mintStep === 3 && reservation && (
          <Preferences
            preferences={preferences}
            choose={choose}
            options={reservation.prefs}
            advance={advance}
          />
        )}
        {mintStep === 4 && reservation && (
          <Mint preferences={preferences} reservation={reservation} />
        )}
        {mintStep === 5 && <Success />}
        <Harold mintStep={mintStep} />
      </div>
    </div>
  );
};

export default MintPage;

export const getServerSideProps = () => {
  return {
    props: {
      title: 'Mint',
      metaDescription: 'Mint your Phase 2 Keekus now!',
    },
  };
};
