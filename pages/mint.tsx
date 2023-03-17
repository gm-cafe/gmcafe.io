import { NextPage } from 'next';
import { useState } from 'react';
import Harold from '../components/mint/Harold';
import Preferences from '../components/mint/Preferences';
import Stepper from '../components/mint/Stepper';
import { Choice, Preference, requestReservation, Reservation } from '../lib/util/mint';

const Mint: NextPage = () => {
  const [mintStep, setMintStep] = useState(0);
  const [preferences, setPreferences] = useState<Preference>([undefined, undefined, undefined]);

  const [reservation, setReservation] = useState<Reservation | undefined>({
    mints: [
      {
        proof: '',
        mintable: {
          seed: 0,
          prefs: [
            ['animals', 'autumn'],
            ['baby', 'bakery'],
            ['battle', 'casual'],
          ],
        },
      },
    ],
    airdrop: 0,
    username: '',
    avatar: '',
  });

  const advance = () => setMintStep(mintStep + 1);
  const choose = (idx: 0 | 1 | 2, choice: Choice) =>
    setPreferences([
      idx === 0 ? choice : preferences[0],
      idx === 1 ? choice : preferences[1],
      idx === 2 ? choice : preferences[2],
    ]);

  const reserve = () => requestReservation('', '', setReservation);

  return (
    <div className="flex min-h-screen flex-col items-center bg-pink-background px-4 pt-32 pb-12 md:pt-40">
      <div className="mx-auto flex w-full max-w-screen-sm flex-col items-center justify-center gap-8">
        <Stepper index={mintStep} />
        {reservation && (
          <Preferences
            preferences={preferences}
            choose={choose}
            options={reservation.mints[0].mintable.prefs}
          />
        )}
        <Harold />
      </div>
    </div>
  );
};

export default Mint;

export const getServerSideProps = () => {
  return {
    props: {
      title: 'Mint',
      metaDescription: 'Mint your Phase 2 Keekus now!',
    },
  };
};
