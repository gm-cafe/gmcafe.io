import Image from 'next/image';
import Typewriter from './Typewriter';

type Props = {
  message: string
}

const Harold = () => (
  <div className="fixed bottom-0 flex max-w-full items-center gap-2 py-4 px-2 md:max-w-none md:gap-8 md:py-4">
    <div className="h-22 w-22 shrink-0 overflow-hidden rounded-full border-6 border-white bg-pink md:h-32 md:w-32 md:border-8">
      <Image src="/mint/harold.png" alt="Harold" width={400} height={400} />
    </div>
    <div className="harold-speech relative flex h-28 w-[420px] flex-col items-center justify-center rounded-3xl bg-white px-2 md:px-4 text-center font-gmcafe tracking-wider text-purple md:before:-ml-[9px] md:text-xl">
      <Typewriter message="You're connected!<div></div>Next, you can try and influence your Keeku to wear items you enjoy!" />
    </div>
  </div>
);

export default Harold;
