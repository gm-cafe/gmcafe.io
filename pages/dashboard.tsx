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
      setMoos(mooBigNs.map((n) => n.toNumber()));
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
      mooTokenUris.forEach((tokenUri, idx) => {
        // Don't fetch again if moo id is fetching or already fetched
        if (!Number.isInteger(moos[idx])) {
          return;
        }

        const front = moos.slice(0, idx);
        const back = moos.slice(idx + 1, moos.length);
        setMoos([...moos.slice(0, idx), true, ...moos.slice(idx + 1, moos.length + 1)]);

        fetch(tokenUri)
          .then((res) => res.json())
          .then((moo: Moo) => {
            setMoos([...front, moo, ...back]);
          });
      });
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
        <div className="my-4 flex w-full flex-col">
          {moos.map((moo, idx) => (
            <DashboardMoo moo={moo} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
