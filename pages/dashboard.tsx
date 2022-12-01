import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead, useContractReads } from 'wagmi';
import DashboardMoo from '../components/dashboard/DashboardMoo';
import { gmooABI, gmooContract } from '../lib/util/addresses';
import { Moo } from '../lib/util/types';

// tokenId (initialized) | fetching (api.gmcafe.io) | fetched
export type MooState = number | true | Moo;

const Dashboard = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [moos, setMoos] = useState<MooState[]>([]);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'getWallet',
    enabled: isConnected,
    args: [address],
    onSuccess: (getWalletData) => {
      const mooBigNs: BigNumber[] = getWalletData?.moos || [];
      if (moos.length === mooBigNs.length) {
        return;
      }
      setMoos(mooBigNs.map((n) => n.toNumber()).concat(332));
    },
  });

  useContractReads({
    contracts: moos
      .filter((moo) => typeof moo === 'number')
      .map((id) => ({
        addressOrName: gmooContract,
        contractInterface: gmooABI,
        functionName: 'tokenURI',
        args: [id],
      })),
    onSuccess: (tokenUriData) => {
      const mooTokenUris: string[] = tokenUriData?.map((result) => result.toString()) || [];
      Promise.all(mooTokenUris.map((tokenUri) => fetch(tokenUri).then((res) => res.json()))).then(
        (moos) => setMoos(moos)
      );
    },
  });

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center bg-pink-background">
      <div className="mx-auto flex w-full max-w-screen-sm flex-col items-center justify-center">
        <nav
          className={classNames(
            'flex w-full',
            { 'justify-end': isConnected },
            { 'justify-center': !isConnected }
          )}
        >
          <ConnectButton />
        </nav>
        <div className="my-4 flex w-full flex-col gap-4">
          {moos.map((moo, idx) => (
            <DashboardMoo moo={moo} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
