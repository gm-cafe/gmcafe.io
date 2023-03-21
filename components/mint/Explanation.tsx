import Image from 'next/image';
import Quantity from './Quantity';

type Props = {
  advance: (_steps?: number) => void;
  mints: number;
  setMints: (_mints: number) => void;
  maxMints: number;
  signature: string;
};

const Explanation = ({ advance, mints, setMints, maxMints }: Props) => {
  return (
    <div className="mb-36 mt-4 flex w-full flex-grow flex-col items-center gap-6">
      <p className="rounded-lg bg-white p-4 text-purple">
        You&apos;re able to mint{' '}
        <span className="rounded-lg bg-purple px-2 py-1 font-gmcafe text-xl text-white">
          {maxMints}
        </span>{' '}
        Keekusaurs! @Ben/@Jane to add more info about influence/random here
      </p>
      {maxMints > 1 && (
        <div className="flex items-center">
          <Quantity mints={mints} setMints={setMints} maxMints={maxMints} />
        </div>
      )}
      <div className="flex gap-6">
        <button
          className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-gmcafe text-3xl uppercase text-purple transition-transform hover:scale-105"
          onClick={() => advance()}
        >
          <div className="h-10 w-10">
            <Image src="/mint/sparkle.png" width={100} height={100} alt="" />
          </div>
          Influence
        </button>
        <button
          className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-gmcafe text-3xl uppercase text-purple transition-transform hover:scale-105"
          onClick={() => advance(2)}
        >
          <div className="h-10 w-10">
            <Image src="/mint/dice.png" width={100} height={100} alt="" />
          </div>
          RANDOM
        </button>
      </div>
    </div>
  );
};

export default Explanation;
