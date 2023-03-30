import { utils } from 'ethers';
import Image from 'next/image';
import { useEffect } from 'react';
import { useWaitForTransaction } from 'wagmi';
import useContractWrite from '../../lib/hooks/useContractWrite';
import { keekABI, keekContract } from '../../lib/util/addresses';
import { Preference, Reservation, preparePrefs } from '../../lib/util/mint';
import { LoadingIcon } from '../Icons';

type Props = {
  preferences: Preference[];
  reservation: Reservation;
  priceWei: string;
  advance: () => void;
  mints: number;
  maxMints: number;
  undo: () => void;
};

const Mint = ({ preferences, reservation, priceWei, advance, mints, maxMints, undo }: Props) => {
  const { proof, packed, prefs } = reservation;

  const isRandom = preferences.every((p) => p.every((q) => q === undefined));

  const prefVals = preparePrefs(preferences, prefs);

  const pricePerUnit = utils.parseUnits(priceWei, 'wei');
  const price = pricePerUnit.mul(preferences.length);

  const {
    write,
    data,
    isLoading: writeLoading,
  } = useContractWrite({
    addressOrName: keekContract,
    contractInterface: keekABI,
    functionName: 'mintKeeks',
    args: [proof, packed, prefVals],
    overrides: {
      value: price,
    },
  });

  const { isSuccess, isLoading: txLoading } = useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data,
  });

  const isLoading = writeLoading || txLoading;

  useEffect(() => {
    isSuccess && advance();
  }, [isSuccess, advance]);

  return (
    <div className="mt-4 flex flex-grow flex-col gap-4 md:gap-6">
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
          Adopt my Keek{mints > 1 ? 's' : ''}
        </button>
        <p className="mx-auto flex items-center gap-1 rounded-xl bg-white px-2 font-gmcafe text-xl text-pink">
          {utils.formatEther(pricePerUnit)}
          <span className="text-base">Ξ</span> x {preferences.length} = {utils.formatEther(price)}
          <span className="text-base">Ξ</span>
        </p>
        {mints !== maxMints && (
          <div className="rounded-xl bg-white px-2 py-2 font-gmcafe text-sm text-purple md:mt-2 md:px-4 md:text-lg">
            <p>
              <span className="text-pink">WARNING:</span> You&apos;re only minting{' '}
              <span className="rounded-xl bg-purple px-2 text-white">{mints}</span> of your{' '}
              <span className="rounded-xl bg-purple px-2 text-white">{maxMints}</span> mints.
            </p>
            <p>
              You won&apos;t be able to come back and mint again. If you&apos;ve changed your mind,
              you can{' '}
              <button className="rounded-xl bg-purple px-2 text-white" onClick={undo}>
                restart the adoption process.
              </button>
            </p>
          </div>
        )}
        {mints === maxMints && (
          <div className="rounded-xl bg-white px-2 py-2 font-gmcafe text-sm text-purple md:mt-2 md:px-4 md:text-lg">
            <p>
              You have selected your favourite traits and showered them on your Keek. When they have
              thawed from their icy captivity, they will see your suggestions and choose what they
              want to wear. Best of luck!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mint;
