import Image from 'next/image';
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
      <div className="w-72 md:w-96">
        <Image src="/mint/banner_influence.png" width={600} height={150} alt="Banner" />
      </div>
      <CustomConnectButton variation="mint" />
      <div className="flex flex-col rounded-lg bg-white px-4 py-2 font-gmcafe text-purple md:text-xl">
        <p>
          Have an airdropped Keekusaur and want to <span className="text-pink">INFLUENCE</span>?
        </p>
        <p>You&apos;ve come to the right place!</p>
        <p>
          If you want to adopt a Keekusaur,{' '}
          <Link href="/adopt">
            <a className="whitespace-nowrap rounded-lg bg-purple px-1.5 text-white md:px-2">
              head to the adoption center
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Connect;
