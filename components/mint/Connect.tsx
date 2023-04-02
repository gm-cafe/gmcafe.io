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
              Adoption Cave is <span className="text-pink underline">{status.phase}</span>. All
              Keeks have been adopted!
            </>
          )}
        </h2>
      )}
      {status && (
        <div className="mx-auto mt-8 flex w-full flex-col md:mt-12 md:w-4/5">
          <div className="flex h-4 overflow-hidden rounded-full bg-white">
            <span
              className={classNames(
                'relative flex h-full items-center justify-center bg-purple text-center font-gmcafe',
                { 'text-purple': status.minted < 175 },
                { 'text-white': status.minted >= 175 }
              )}
              style={{ width: `${(100 * (status.minted + status.reserved)) / status.supply}%` }}
            >
              {status.minted + status.reserved}
            </span>
            <span className="relative flex h-full flex-grow items-center justify-center bg-white text-center font-gmcafe text-white" />
          </div>
          <div className="mt-2 text-center font-gmcafe text-xl text-purple">
            Supply: <span className="text-pink">3333</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connect;
