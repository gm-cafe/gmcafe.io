import Image from 'next/image';
import Typewriter from './Typewriter';

type Props = {
  mintStep: number;
};

const messages = [
  "You're connected!<div></div>Next, you can try and influence your Keeku to wear items you enjoy!",
  "You're connected!<div></div>Next, you can try and influence your Keeku to wear items you enjoy!",
  "You're connected!<div></div>Next, you can try and influence your Keeku to wear items you enjoy!",
  "You're connected!<div></div>Next, you can try and influence your Keeku to wear items you enjoy!",
  "You're connected!<div></div>Next, you can try and influence your Keeku to wear items you enjoy!",
  "Congratulations! You've officially adopted your Keekusaur.",
];

const Harold = ({ mintStep }: Props) => (
  <div className="fixed bottom-0 flex max-w-full items-center gap-2 py-4 px-2 md:max-w-none md:gap-8 md:py-4">
    <div className="h-22 w-22 shrink-0 overflow-hidden rounded-full border-6 border-white bg-pink md:h-32 md:w-32 md:border-8">
      <Image src="/mint/harold.png" alt="Harold" width={400} height={400} />
    </div>
    <div className="harold-speech relative flex h-28 w-[420px] flex-col items-center justify-center rounded-3xl bg-white px-2 text-center font-gmcafe tracking-wider text-purple md:px-4 md:text-xl md:before:-ml-[9px]">
      {mintStep === 0 && <Typewriter message={messages[0]} />}
      {mintStep === 1 && <Typewriter message={messages[1]} />}
      {mintStep === 2 && <Typewriter message={messages[2]} />}
      {mintStep === 3 && <Typewriter message={messages[3]} />}
      {mintStep === 4 && <Typewriter message={messages[4]} />}
      {mintStep === 5 && <Typewriter message={messages[5]} />}
    </div>
  </div>
);

export default Harold;
