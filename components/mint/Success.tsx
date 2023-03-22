import Image from 'next/image';
import Confetti from '../Confetti';
import { OpenSeaIcon } from '../Icons';

const Success = () => {
  return (
    <div className="mb-36 mt-4 flex w-full flex-grow flex-col items-center">
      <a
        className="flex items-center gap-2 rounded-xl bg-white px-3 py-1 font-gmcafe text-3xl text-purple transition-transform hover:scale-105"
        href={'https://opensea.io/BenColefax/collected/goodmorningcafe-old'}
      >
        <OpenSeaIcon className="h-8 w-8" fill="#8946ab" /> View your Keekusaur
      </a>
      <div className="w-80">
        <Image src="/mint/placeholder.png" width={600} height={600} alt="" />
      </div>
      <Confetti />
    </div>
  );
};

export default Success;
