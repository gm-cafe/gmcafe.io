import Image from 'next/image';
import { Preference } from '../../lib/util/mint';

type Props = {
  preferences: Preference[];
};

const Mint = ({ preferences }: Props) => {
  const isRandom = preferences.every((p) => p.every((q) => q === undefined));

  return (
    <div className="mt-4 flex flex-grow flex-col gap-4 md:gap-8">
      <div className="flex gap-6 md:gap-10">
        {isRandom ? (
          <div className="relative mt-2 h-22 w-22 transition-transform hover:scale-105 md:h-32 md:w-32">
            {preferences.map((_, idx) => (
              <div
                key={idx}
                className="absolute top-0 h-full w-full rounded-xl bg-white shadow-lg-purple"
                style={{
                  transform: `rotate(${
                    idx === 0
                      ? 0
                      : Math.random() * preferences.length * 6 * (Math.random() > 0.5 ? -1 : 1)
                  }deg)`,
                }}
              >
                <Image src={`/mint/random.gif`} alt="Random Card" width={400} height={400} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="relative mt-6 h-22 w-22 -rotate-12 transition-transform hover:scale-105 md:mt-8 md:h-32 md:w-32">
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
                          : Math.random() * preferences.length * 6 * (Math.random() > 0.5 ? -1 : 1)
                      }deg)`,
                    }}
                  >
                    <Image src={`/mint/${p}.png`} alt="Card 1" width={400} height={400} />
                  </div>
                ))}
            </div>
            <div className="relative h-22 w-22 transition-transform hover:scale-105 md:h-32 md:w-32">
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
                          : Math.random() * preferences.length * 6 * (Math.random() > 0.5 ? -1 : 1)
                      }deg)`,
                    }}
                  >
                    <Image src={`/mint/${p}.png`} alt="Card 2" width={400} height={400} />
                  </div>
                ))}
            </div>
            <div className="relative mt-6 h-22 w-22 rotate-12 transition-transform hover:scale-105 md:mt-8 md:h-32 md:w-32">
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
                          : Math.random() * preferences.length * 6 * (Math.random() > 0.5 ? -1 : 1)
                      }deg) translateY(${idx * 6}px)`,
                    }}
                  >
                    <Image src={`/mint/${p}.png`} alt="Card 3" width={400} height={400} />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col justify-center gap-2">
        <button className="mx-auto rounded-full bg-white px-4 py-2 font-gmcafe text-2xl text-purple shadow-lg-purple transition-transform hover:scale-110 md:px-8 md:py-4 md:text-4xl">
          Mint
        </button>
        <p className="mx-auto rounded-xl bg-white px-2 font-gmcafe text-xl text-pink">
          0.06e x 3 = 0.18e
        </p>
      </div>
    </div>
  );
};

export default Mint;
