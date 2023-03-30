import Image from 'next/image';
import Confetti from '../Confetti';
import { OpenSeaIcon, TwitterIcon } from '../Icons';

const Success = () => {
  return (
    <div className="mb-28 mt-4 flex w-full flex-grow flex-col items-center">
      <a
        className="flex items-center gap-2 rounded-xl bg-white px-3 py-1 font-gmcafe text-3xl text-purple transition-transform hover:scale-105"
        href={'https://opensea.io/BenColefax/collected/goodmorningcafe-old'}
        rel="noreferrer"
        target="_blank"
      >
        <OpenSeaIcon className="h-8 w-8" fill="#8946ab" /> View your Keekusaur
      </a>
      <div className="mt-4 w-40 md:w-48">
        <Image src="/mint/placeholder.png" width={700} height={800} alt="" />
      </div>
      <a
        className="flex items-center gap-2 rounded-xl bg-white px-3 py-1 font-gmcafe text-3xl text-purple transition-transform hover:scale-105"
        href="https://twitter.com/intent/tweet?text=I'm%20gonna%20be%20a%20parent%20%F0%9F%98%AD%0A%0AJust%20adopted%20my%20Keekusaur!%20Now%20I'm%20just%20waiting%20for%20the%20ice%20to%20thaw.%20%F0%9F%A7%8A%E2%9C%A8%F0%9F%A6%96%0A%0A%40gmcafeNFT%20%23rawr"
        rel="noreferrer"
        target="_blank"
      >
        <TwitterIcon className="h-8 w-8" fill="#8946ab" /> Tweet it
      </a>
      <Confetti />
    </div>
  );
};

export default Success;
