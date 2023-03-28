import { useEffect } from 'react';
import { useSignMessage } from 'wagmi';
import CustomConnectButton from '../CustomConnectButton';

type Props = {
  advance: (_steps?: number) => void;
  signature?: string;
  setSignature: (_signature?: string) => void;
  isConnected: boolean;
};

const Connect = ({ advance, signature, setSignature, isConnected }: Props) => {
  const { signMessage, isLoading } = useSignMessage({
    message: 'RAWR!',
    onSuccess: setSignature,
  });

  useEffect(() => {
    isConnected && !isLoading && !signature && signMessage();
    isConnected && signature && advance();
  }, [isConnected, advance, signMessage, signature, isLoading]);

  return (
    <div className="mb-32 mt-10 flex w-full flex-grow items-start justify-center">
      <CustomConnectButton variation="mint" />
      {isConnected && (
        <button
          className="rounded-full bg-white px-6 py-3 font-gmcafe text-2xl text-purple transition-transform hover:scale-110 md:px-8 md:py-4 md:text-4xl"
          onClick={() => signMessage()}
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default Connect;
