import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { gmooABI, gmooContract } from '../lib/util/addresses';
import { Moo } from '../lib/util/types';

const Dashboard = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [moos, setMoos] = useState<Moo[]>([]);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { data: getWalletData } = useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'getWallet',
    enabled: isConnected,
    args: address,
  });
  const mooBigNs: BigNumber[] = getWalletData?.moos || [];
  const mooIds = mooBigNs.map((n) => n.toNumber());

  useEffect(() => {
    moos.length !== mooIds.length && setMoos(Array(mooIds.length).fill(null));
  }, [mooIds, moos.length]);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center bg-pink-background">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center">
        <nav className={classNames({ 'justify-end': isConnected })}>
          <ConnectButton />
        </nav>
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
};

export default Dashboard;
