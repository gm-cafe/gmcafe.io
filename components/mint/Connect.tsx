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

  return (
    <div className="mb-32 mt-10 flex w-full flex-grow flex-col items-center">
      <CustomConnectButton variation="mint" />
      {isConnected && (
        <button
          className="rounded-full bg-white px-6 py-3 font-gmcafe text-2xl text-purple transition-transform hover:scale-110 md:px-8 md:py-4 md:text-4xl"
          onClick={() => signMessage()}
        >
          Continue
        </button>
      )}
      {status && (
        <div className="relative mx-auto w-full md:w-4/5">
          <div className="mt-12 flex h-4 overflow-x-hidden overflow-y-visible rounded-full bg-white">
            <span
              className="relative flex h-full items-center justify-center bg-purple text-center font-gmcafe text-white"
              // style={{ width: `${(100 * status.minted) / status.supply}%` }}
              style={{ width: `${(100 * 1000) / status.supply}%` }}
            >
              1000
            </span>
            <span
              className="relative flex h-full items-center justify-center bg-white text-center font-gmcafe text-white"
              // style={{ width: `${(100 * status.dropped) / status.supply}%` }}
              style={{ width: `${(100 * (status.supply - 1000 - 333)) / status.supply}%` }}
            />
            <span
              className="relative flex h-full items-center justify-center bg-pink text-center font-gmcafe text-white"
              // style={{ width: `${(100 * status.dropped) / status.supply}%` }}
              style={{ width: `${(100 * 333) / status.supply}%` }}
            >
              333
            </span>
          </div>
          <div className="absolute top-20 flex w-full">
            <div style={{ flexBasis: `${(100 * 1000) / status.supply}%` }} className="text-center">
              <span className="rounded-lg bg-white px-2 py-0.5 font-gmcafe text-purple">Mint</span>
            </div>
            <div style={{ flexBasis: `${(100 * (status.supply - 1000 - 333)) / status.supply}%` }}/>
            <div style={{ flexBasis: `${(100 * 333) / status.supply}%` }} className="text-center">
              <span className="rounded-lg bg-white px-2 py-0.5 font-gmcafe text-pink">Drop</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connect;
