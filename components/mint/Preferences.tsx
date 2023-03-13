import { useState } from 'react';
import CardStack from './CardStack';

const Preferences = () => {
  const [prefStep, setPrefStep] = useState(0);

  const nextStep = () => setPrefStep(prefStep + 1);

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row">
      <CardStack current={prefStep} next={nextStep} />
      <span className="font-gmcafe text-4xl text-purple">OR</span>
      <CardStack current={prefStep} next={nextStep} />
    </div>
  );
};

export default Preferences;
