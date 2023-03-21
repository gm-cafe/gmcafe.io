import Image from 'next/image';
import { Preference } from '../../lib/util/mint';

type Props = {
  preferences: Preference[];
};

const Mint = ({ preferences }: Props) => {
  const isRandom = preferences.every((p) => p === undefined);

  return (
    <div className="mt-4 flex flex-grow flex-col">
      <div className="flex gap-10">
        {isRandom ? (
          <div className="mb-8 mt-2 h-36 w-36 rounded-xl bg-white shadow-lg-purple transition-transform hover:scale-105">
            <Image src={`/mint/random.gif`} alt="Random Card" width={400} height={400} />
          </div>
        ) : (
          <>
            <div className="relative mt-8 h-36 w-36 -rotate-12 transition-transform hover:scale-105">
              {preferences
                .map((p) => p[0])
                .map((p, idx) => (
                  <div
                    key={`${p}-${idx}`}
                    className="absolute h-full w-full rounded-xl bg-white shadow-lg-purple"
                    style={{
                      transform: `rotate(${
                        idx === 0
                          ? 0
                          : Math.random() * preferences.length * 5 * (Math.random() > 0.5 ? -1 : 1)
                      }deg)`,
                    }}
                  >
                    <Image src={`/mint/${p}.png`} alt="Card 1" width={400} height={400} />
                  </div>
                ))}
            </div>
            <div className="relative h-36 w-36 transition-transform hover:scale-105">
              {preferences
                .map((p) => p[1])
                .map((p, idx) => (
                  <div
                    key={`${p}-${idx}`}
                    className="absolute h-full w-full rounded-xl bg-white shadow-lg-purple"
                    style={{
                      transform: `rotate(${
                        idx === 0
                          ? 0
                          : Math.random() * preferences.length * 5 * (Math.random() > 0.5 ? -1 : 1)
                      }deg)`,
                    }}
                  >
                    <Image src={`/mint/${p}.png`} alt="Card 2" width={400} height={400} />
                  </div>
                ))}
            </div>
            <div className="relative mt-8 h-36 w-36 rotate-12 transition-transform hover:scale-105">
              {preferences
                .map((p) => p[2])
                .map((p, idx) => (
                  <div
                    key={`${p}-${idx}`}
                    className="absolute h-full w-full rounded-xl bg-white shadow-lg-purple"
                    style={{
                      transform: `rotate(${
                        idx === 0
                          ? 0
                          : Math.random() * preferences.length * 5 * (Math.random() > 0.5 ? -1 : 1)
                      }deg)`,
                    }}
                  >
                    <Image src={`/mint/${p}.png`} alt="Card 3" width={400} height={400} />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center">
        <button className="rounded-full bg-white shadow-lg-purple px-8 py-4 font-gmcafe text-4xl text-purple shadow-lg-purple transition-transform hover:scale-110">
          Mint
        </button>
      </div>
    </div>
  );
};

export default Mint;
