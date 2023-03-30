import Link from 'next/link';
import { useEffect } from 'react';
import CustomConnectButton from '../CustomConnectButton';

type Props = {
  advance: () => void;
  isConnected: boolean;
};

const Connect = ({ advance, isConnected }: Props) => {
  useEffect(() => {
    isConnected && advance();
  }, [isConnected, advance]);

  return (
    <div className="flex flex-col items-center gap-4">
      <CustomConnectButton variation="mint" />
      <div className="flex flex-col gap-2 rounded-lg bg-white px-4 py-2 font-gmcafe text-xl text-purple">
        <p>
          Have an airdropped Keekusaur and want to <span className="text-pink">INFLUENCE</span>?
        </p>
        <p>You&apos;ve come to the right place!</p>
        <p>
          If you want to adopt a Keekusaur, click{' '}
          <Link href="/adopt">
            <a className="rounded-lg bg-purple px-2 text-white">here</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Connect;
