import Image from 'next/image';
import Confetti from '../Confetti';
import { OpenSeaIcon } from '../Icons';

type Props = {
  back: () => void;
};

const Success = ({ back }: Props) => {
  return (
    <div className="flex w-full flex-col items-center">
      <a
        className="flex items-center gap-2 rounded-xl bg-white px-3 py-1 font-gmcafe text-3xl text-purple transition-transform hover:scale-105 mb-2"
        href={'https://opensea.io/BenColefax/collected/goodmorningcafe-old'}
        rel="noreferrer"
        target="_blank"
      >
        <OpenSeaIcon className="h-8 w-8" fill="#8946ab" /> View your Keekusaur
      </a>
      <div className="mt-4 w-44 md:w-60">
        <Image src="/mint/placeholder.png" width={700} height={800} alt="" />
      </div>
      <p className="rounded-lg bg-white px-4 py-3 font-gmcafe text-lg text-purple md:text-xl">
        You&apos;ve successfully influenced your Keekusaur! If you&apos;d like to influence another,
        you can{' '}
        <button className="rounded-lg bg-purple px-1.5 text-white md:px-2" onClick={back}>
          restart the process
        </button>
      </p>
      <Confetti />
    </div>
  );
};

export default Success;
