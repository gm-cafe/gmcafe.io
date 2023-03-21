import Image from 'next/image';
import { Preference } from '../../lib/util/mint';

type Props = {
  preferences: Preference;
};

const Mint = ({ preferences }: Props) => {
  const isRandom = preferences.every((p) => p === undefined);

  return (
    <div className="mt-4 flex flex-grow flex-col">
      <div className="flex gap-6">
        {isRandom ? (
          <div className="mb-8 mt-2 h-36 w-36 rounded-xl bg-white transition-transform hover:scale-105">
            <Image src={`/mint/random.gif`} alt="Random Card" width={400} height={400} />
          </div>
        ) : (
          <>
            <div className="mt-8 h-36 w-36 -rotate-12 rounded-xl bg-white transition-transform hover:scale-105">
              <Image src={`/mint/${preferences[0]}.png`} alt="Card 1" width={400} height={400} />
            </div>
            <div className="h-36 w-36 rounded-xl bg-white transition-transform hover:scale-105">
              <Image src={`/mint/${preferences[1]}.png`} alt="Card 2" width={400} height={400} />
            </div>
            <div className="mt-8 h-36 w-36 rotate-12 rounded-xl bg-white transition-transform hover:scale-105">
              <Image src={`/mint/${preferences[2]}.png`} alt="Card 3" width={400} height={400} />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center">
        <button className="rounded-full bg-white px-8 py-4 font-gmcafe text-4xl text-purple shadow-lg-purple transition-transform hover:scale-110">
          Mint
        </button>
      </div>
    </div>
  );
};

export default Mint;
