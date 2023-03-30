import Image from 'next/image';
import useContractRead from '../../lib/hooks/useContractRead';
import { keekContract, keekABI } from '../../lib/util/addresses';
import Quantity from './Quantity';

type Props = {
  advance: (_steps?: number) => void;
  mints: number;
  setMints: (_mints: number) => void;
  maxMints: number;
  signature: string;
  address: string;
  packed: number;
  disableInfluence: boolean;
};

const Explanation = ({
  advance,
  mints,
  setMints,
  maxMints,
  address,
  packed,
  disableInfluence,
}: Props) => {
  const { data: hasMinted } = useContractRead({
    addressOrName: keekContract,
    contractInterface: keekABI,
    functionName: 'hasMinted',
    args: [packed, address],
  });

  return (
    <div className="mb-32 flex w-full flex-grow flex-col items-center gap-2 md:mt-4 md:gap-6">
      {!hasMinted && (
        <div className="flex flex-col gap-2 rounded-lg bg-white p-4 text-justify text-xs text-purple md:text-left md:text-base">
          <p>
            While the Keekusaurs are frozen awaiting to be thawed, you can choose to <b>SUGGEST</b>{' '}
            traits that you appreciate most. Your careful selections will <b>INFLUENCE</b> your
            adopted Keekusaur, increasing the odds of adopting your forever Keek!
          </p>
          <p>
            You will now be shown a series of &apos;<b>A</b>&apos; or &apos;<b>B</b>&apos; trait
            groups. Select your favourite from the batches shown and move through the cards until
            you reach the end.
          </p>
        </div>
      )}
      {hasMinted && (
        <p className="rounded-lg bg-white p-4 text-sm text-purple md:text-base">
          Looks like you&apos;ve already adopted your Keekusaur(s)!
        </p>
      )}
      {!hasMinted && maxMints > 1 && (
        <div className="flex items-center">
          <Quantity mints={mints} setMints={setMints} maxMints={maxMints} />
        </div>
      )}
      <div className="flex items-center gap-2 md:gap-4">
        {!disableInfluence && (
          <button
            className="flex items-center gap-2 rounded-full bg-white px-3 py-1 font-gmcafe text-2xl uppercase text-purple transition-transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 md:px-4 md:py-1.5 md:text-3xl"
            onClick={() => advance()}
            disabled={!!hasMinted}
          >
            <div className="h-6 w-6 md:h-10 md:w-10">
              <Image src="/mint/sparkle.png" width={100} height={100} alt="" />
            </div>
            Influence
          </button>
        )}
        <span className="font-gmcafe text-xl text-purple">OR</span>
        <button
          className="flex items-center gap-2 rounded-full bg-white px-3 py-1 font-gmcafe text-2xl uppercase text-purple transition-transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 md:px-4 md:py-1.5 md:text-3xl"
          onClick={() => advance(2)}
          disabled={!!hasMinted}
        >
          <div className="h-6 w-6 md:h-10 md:w-10">
            <Image src="/mint/dice.png" width={100} height={100} alt="" />
          </div>
          RANDOM
        </button>
      </div>
    </div>
  );
};

export default Explanation;
