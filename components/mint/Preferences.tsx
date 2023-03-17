import { useState } from 'react';
import CardStack from './CardStack';

const Preferences = () => {
  const [prefStep, setPrefStep] = useState(0);

  const nextStep = () => setPrefStep(prefStep + 1);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4 md:gap-8">
        <CardStack current={prefStep} next={nextStep} />
        <span className="flex-grow text-center font-gmcafe text-2xl text-purple md:text-4xl">
          OR
        </span>
        <CardStack current={prefStep} next={nextStep} />
      </div>
      <div className="mt-6 flex justify-center">
        <button className="rounded-full bg-purple px-4 py-1 font-gmcafe text-white shadow-lg-purple transition-transform hover:scale-105 md:text-xl">
          🎲 Feeling adventurous?
        </button>
      </div>
    </div>
  );
};

export default Preferences;
