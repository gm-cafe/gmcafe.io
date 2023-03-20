import { useEffect } from 'react';
import { useAccount } from 'wagmi';

type Props = {
  advance: () => void;
};

const Connect = ({ advance }: Props) => {
  const { isConnected } = useAccount();

  useEffect(() => {
    isConnected && advance();
  }, [isConnected, advance]);

  return (
    <div className="mb-32 mt-10 flex w-full flex-grow items-start justify-center">
      {/* <CustomConnectButton variation="mint" /> */}
      <button
        className="rounded-full bg-white px-8 py-4 font-gmcafe text-4xl text-purple transition-transform hover:scale-110"
        onClick={advance}
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default Connect;
