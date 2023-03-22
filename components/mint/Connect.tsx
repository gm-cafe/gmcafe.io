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
  const { signMessage } = useSignMessage({
    message: 'RAWR!',
    onSuccess: setSignature,
  });

  useEffect(() => {
    isConnected && !signature && signMessage();
    isConnected && signature && advance();
  }, [isConnected, advance, signMessage, signature]);

  return (
    <div className="mb-32 mt-10 flex w-full flex-grow items-start justify-center">
      <CustomConnectButton variation="mint" />
    </div>
  );
};

export default Connect;
