import { utils } from 'ethers';
import Image from 'next/image';
import { useEffect } from 'react';
import { useWaitForTransaction } from 'wagmi';
import useContractWrite from '../../lib/hooks/useContractWrite';
import { keekABI, keekContract } from '../../lib/util/addresses';
import { Preference, Options, Reservation } from '../../lib/util/mint';
import { LoadingIcon } from '../Icons';

type Props = {
  preferences: Preference[];
  reservation: Reservation;
  priceWei: string;
  advance: () => void;
};

const preparePrefs = (preferences: Preference[], options?: Options[]) =>
  preferences.map((preference, idx) => {
    if (!options || preference.every((p) => p === undefined)) {
      return 0;
    }

    const option = options[idx];

    const [p1, p2, p3] = preference;
    const [o1, o2, o3] = option;

    const t1 = p1 === o1[0] ? 0 : 1;
    const t2 = p2 === o2[0] ? 0 : 2;
    const t3 = p3 === o3[0] ? 0 : 4;

    return 8 + t1 + t2 + t3;
  });

const Mint = ({ preferences, reservation, priceWei, advance }: Props) => {
  const { proof, packed, prefs } = reservation;

  const isRandom = preferences.every((p) => p.every((q) => q === undefined));

  const prefVals = preparePrefs(preferences, prefs);

  const pricePerUnit = utils.parseUnits(priceWei, 'wei');
  const price = pricePerUnit.mul(preferences.length);

  const { write, data, isLoading } = useContractWrite({
    addressOrName: keekContract,
    contractInterface: keekABI,
    functionName: 'mint',
    args: [proof, packed, prefVals],
    overrides: {
      value: price,
    },
  });

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data,
  });

  useEffect(() => {
    isSuccess && advance();
  }, [isSuccess, advance]);

  return (
    <div className="mt-4 flex flex-grow flex-col gap-4 md:gap-8">
      <div className="flex justify-center gap-6 md:gap-10">
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
      <div className="flex flex-col justify-center gap-2">
        <button
          className="mx-auto flex items-center gap-2 rounded-full bg-white px-4 py-2 font-gmcafe text-2xl text-purple shadow-lg-purple transition-transform hover:scale-110 md:px-8 md:py-4 md:text-4xl"
          onClick={() => write?.()}
          disabled={isLoading}
        >
          {isLoading && <LoadingIcon className="h-8 w-8" />}
          Mint
        </button>
        <p className="mx-auto flex items-center gap-1 rounded-xl bg-white px-2 font-gmcafe text-xl text-pink">
          {utils.formatEther(pricePerUnit)}
          <span className="text-base">Ξ</span> x {preferences.length} = {utils.formatEther(price)}
          <span className="text-base">Ξ</span>
        </p>
      </div>
    </div>
  );
};

export default Mint;
