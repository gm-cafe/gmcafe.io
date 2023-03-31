import Image from 'next/image';
import { useEffect } from 'react';
import { useWaitForTransaction } from 'wagmi';
import useContractWrite from '../../lib/hooks/useContractWrite';
import { keekContract, keekABI } from '../../lib/util/addresses';
import { Options, Preference, preparePrefs } from '../../lib/util/mint';
import { LoadingIcon } from '../Icons';

type Props = {
  advance: () => void;
  preference: Preference;
  options?: Options;
  token: number;
};

const Commit = ({ advance, preference, options, token }: Props) => {
  const [pref] = preparePrefs([preference], options ? [options] : undefined);

  const {
    write,
    data,
    isLoading: writeLoading,
  } = useContractWrite({
    addressOrName: keekContract,
    contractInterface: keekABI,
    functionName: 'setPref',
    args: [token, pref],
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
    <div className="flex flex-col">
      <div className="mb-12 flex justify-center gap-6 md:gap-10">
        <div className="relative top-10 mt-6 h-22 w-22 -rotate-12 rounded-xl bg-white shadow-lg-purple transition-transform hover:scale-105 md:mt-8 md:h-32 md:w-32">
          <Image src={`/mint/${preference[0]}.png`} alt="Card 1" width={400} height={400} />
        </div>
        <div className="relative mt-6 h-22 w-22 rounded-xl bg-white shadow-lg-purple transition-transform hover:scale-105 md:mt-8 md:h-32 md:w-32">
          <Image src={`/mint/${preference[1]}.png`} alt="Card 2" width={400} height={400} />
        </div>
        <div className="relative top-10 mt-6 h-22 w-22 rotate-12 rounded-xl bg-white shadow-lg-purple transition-transform hover:scale-105 md:mt-8 md:h-32 md:w-32">
          <Image src={`/mint/${preference[2]}.png`} alt="Card 3" width={400} height={400} />
        </div>
      </div>
      <div>
        <button
          className="mx-auto flex items-center gap-2 rounded-full bg-white px-3 py-1 font-gmcafe text-2xl uppercase text-purple transition-transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 md:px-4 md:py-1.5 md:text-3xl"
          onClick={() => write?.()}
          disabled={isLoading}
        >
          {!isLoading && (
            <div className="h-6 w-6 md:h-10 md:w-10">
              <Image src="/mint/sparkle.png" width={100} height={100} alt="" />
            </div>
          )}
          {isLoading && <LoadingIcon className="h-6 w-6 md:h-10 md:w-10" />}
          Influence
        </button>
      </div>
      <div className="mt-8 rounded-xl bg-white px-2 py-2 font-gmcafe text-sm text-purple md:px-4 md:text-lg">
        <p>
          You have selected your favourite traits and showered them on your Keek. When they have
          thawed from their icy captivity, they will see your suggestions and choose what they want
          to wear. Best of luck!
        </p>
      </div>
    </div>
  );
};

export default Commit;
