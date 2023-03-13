import { NextPage } from 'next';
import { useState } from 'react';
import Preferences from '../components/mint/Preferences';
import Stepper from '../components/mint/Stepper';

const Mint: NextPage = () => {
  const [mintStep, setMintStep] = useState(2);

  return (
    <div className="flex min-h-screen items-center bg-pink-background pt-40 pb-12">
      <div className="mx-auto flex w-full max-w-screen-sm flex-col items-center justify-center gap-8">
        <Stepper index={mintStep} />
        <Preferences />
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
