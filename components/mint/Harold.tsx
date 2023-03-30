import classNames from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import Typewriter from './Typewriter';

type Props = {
  mintStep: number;
};

const messages = [
  'To get started with adopting your tender little Keekusaur, hit the Connect Wallet’ button!',
  "Your wallet is connected!<div></div>Let's get started, precious Patron.",
  "You're connected! Next, you can try and influence your Keeku to wear items you enjoy!",
  'Pick your favourite card from the two shown. Do this three times!',
  'Now it is time to adopt and become a bonafide parent of your very own Keekusaur.',
  "You're a parent now! Congratulations on adopting a precious Keekusaur.",
];

const Harold = ({ mintStep }: Props) => {
  const [talking, setTalking] = useState(false);

  return (
    <div className="fixed bottom-0 flex max-w-full items-center gap-2 py-3 px-2 md:max-w-none md:gap-8 md:py-4">
      <div className="relative h-22 w-22 shrink-0 overflow-hidden rounded-full border-6 border-white bg-pink md:h-32 md:w-32 md:border-8">
        <div className={classNames('absolute', { hidden: talking })}>
          <Image src="/mint/harold.png" alt="Harold" width={400} height={400} />
        </div>
        <div className={classNames('absolute', { hidden: !talking })}>
          <Image src="/mint/harold.gif" alt="Harold" width={400} height={400} />
        </div>
      </div>
      <div className="harold-speech relative flex h-24 w-[420px] flex-col items-center justify-center rounded-3xl bg-white px-2 text-center font-gmcafe tracking-wider text-purple md:h-28 md:px-4 md:text-xl md:before:-ml-[9px]">
        {mintStep === 0 && (
          <Typewriter
            onStart={() => setTalking(true)}
            onFinish={() => setTalking(false)}
            message={messages[0]}
          />
        )}
        {mintStep === 1 && (
          <Typewriter
            onStart={() => setTalking(true)}
            onFinish={() => setTalking(false)}
            message={messages[1]}
          />
        )}
        {mintStep === 2 && (
          <Typewriter
            onStart={() => setTalking(true)}
            onFinish={() => setTalking(false)}
            message={messages[2]}
          />
        )}
        {mintStep === 3 && (
          <Typewriter
            onStart={() => setTalking(true)}
            onFinish={() => setTalking(false)}
            message={messages[3]}
          />
        )}
        {mintStep === 4 && (
          <Typewriter
            onStart={() => setTalking(true)}
            onFinish={() => setTalking(false)}
            message={messages[4]}
          />
        )}
        {mintStep === 5 && (
          <Typewriter
            onStart={() => setTalking(true)}
            onFinish={() => setTalking(false)}
            message={messages[5]}
          />
        )}
      </div>
    </div>
  );
};

export default Harold;
