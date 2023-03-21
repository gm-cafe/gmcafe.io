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
import { Choice, Preference, requestReservation, Reservation } from '../lib/util/mint';

const MintPage: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [signature, setSignature] = useState<string>();

  const [mintStep, setMintStep] = useState(0);
  const [preferences, setPreferences] = useState<Preference>([undefined, undefined, undefined]);

  const [reservation, setReservation] = useState<Reservation | undefined>();

  const [mints, setMints] = useState(1);

  const advance = (steps = 1) => setMintStep(mintStep + steps);
  const choose = (idx: 0 | 1 | 2, choice: Choice) =>
    setPreferences([
      idx === 0 ? choice : preferences[0],
      idx === 1 ? choice : preferences[1],
      idx === 2 ? choice : preferences[2],
    ]);

  useEffect(() => {
    address && signature && !reservation && requestReservation(address, signature, setReservation);
  }, [address, signature, reservation, setReservation]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-pink-background px-4 pt-32 pb-12 md:pt-40">
      <div className="mx-auto flex w-full max-w-screen-sm flex-grow flex-col items-center justify-center">
        <div className="w-96">
          <Image src="/mint/banner.png" width={600} height={150} alt="Banner" />
        </div>
        <Stepper index={mintStep} />
        {mintStep === 0 && (
          <Connect
            advance={advance}
            signature={signature}
            setSignature={setSignature}
            isConnected={isConnected}
          />
        )}
        {mintStep === 1 && <Story advance={advance} />}
        {mintStep === 2 && signature && (
          <Explanation
            advance={advance}
            mints={mints}
            setMints={setMints}
            maxMints={reservation?.prefs.length || 1}
            signature={signature}
          />
        )}
        {mintStep === 3 && reservation && (
          <Preferences
            preferences={preferences}
            choose={choose}
            options={reservation.prefs[0]}
            advance={advance}
          />
        )}
        {mintStep === 4 && <Mint preferences={preferences} />}
        <Harold />
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
