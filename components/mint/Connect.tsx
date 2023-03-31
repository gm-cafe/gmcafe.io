import classNames from 'classnames';
import { useEffect } from 'react';
import { useSignMessage } from 'wagmi';
import { Status } from '../../lib/util/mint';
import CustomConnectButton from '../CustomConnectButton';

type Props = {
  advance: (_steps?: number) => void;
  signature?: string;
  setSignature: (_signature?: string) => void;
  isConnected: boolean;
  status?: Status;
};

const Connect = ({ advance, signature, setSignature, isConnected, status }: Props) => {
  const { signMessage, isLoading } = useSignMessage({
    message: 'RAWR!',
    onSuccess: setSignature,
  });

  useEffect(() => {
    isConnected && signature && advance();
  }, [isConnected, signature, advance]);

  useEffect(() => {
    isConnected && !isLoading && !signature && signMessage();
  }, [isConnected]);

  const isClosed = !status || status.phase.toLowerCase() === 'closed';

  return (
    <div className="mb-32 mt-10 flex w-full flex-grow flex-col items-center">
      <CustomConnectButton variation="mint" disabled={isClosed} />
      {isConnected && (
        <button
          className="rounded-full bg-white px-6 py-3 font-gmcafe text-2xl text-purple transition-transform hover:scale-110 md:px-8 md:py-4 md:text-4xl"
          onClick={() => signMessage()}
        >
          Continue
        </button>
      )}
      {status && (
        <h2 className="mt-4 text-center font-gmcafe text-xl text-purple md:text-2xl">
          {!isClosed ? (
            <>
              We&apos;re in the <span className="text-pink underline">{status.phase}</span>!
            </>
          ) : (
            <>
              Adoption Cave is currently <span className="text-pink underline">{status.phase}</span>
              , check back later!
            </>
          )}
        </h2>
      )}
      {status && (
        <div className="relative mx-auto w-full md:w-4/5">
          <div className="mt-12 flex h-4 overflow-hidden rounded-full bg-white">
            <span
              className={classNames(
                'relative flex h-full items-center justify-center bg-purple text-center font-gmcafe',
                { 'text-purple': status.minted < 175 },
                { 'text-white': status.minted >= 175 }
              )}
              style={{ width: `${(100 * status.minted) / status.supply}%` }}
            >
              {status.minted}
            </span>
            <span className="relative flex h-full flex-grow items-center justify-center bg-white text-center font-gmcafe text-white" />
            <span
              className="relative flex h-full items-center justify-center bg-pink text-center font-gmcafe text-white"
              style={{ width: `${(100 * status.reserved) / status.supply}%` }}
            >
              {status.reserved}
            </span>
          </div>
          <div className="absolute top-20 flex w-full">
            <div
              style={{ flexBasis: `${(100 * status.minted) / status.supply}%` }}
              className="text-center"
            >
              <span className="rounded-lg bg-white px-2 py-0.5 font-gmcafe text-purple">Mint</span>
            </div>
            <div className="flex-grow" />
            <div
              style={{ flexBasis: `${(100 * status.reserved) / status.supply}%` }}
              className="text-center"
            >
              <span className="rounded-lg bg-white px-2 py-0.5 font-gmcafe text-pink">Airdrop</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connect;
