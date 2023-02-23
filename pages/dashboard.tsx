import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { BigNumber } from 'ethers';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead, useContractReads } from 'wagmi';
import DashboardMoo from '../components/dashboard/DashboardMoo';
import useGetHerd from '../lib/hooks/useGetHerd';
import { gmooABI, gmooContract } from '../lib/util/addresses';
import { Moo } from '../lib/util/types';

// tokenId (initialized) | fetching (api.gmcafe.io) | fetched
export type MooState = number | true | Moo;

const Dashboard = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [moos, setMoos] = useState<MooState[]>([]);
  const { address, isConnected } = useAccount();

  const herd = useGetHerd();

  const lockedCount = herd.filter((moo) => moo.locked).length;
  const unlockedCount = herd.length - lockedCount;

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
        {moos.length > 0 && (
          <div className="flex flex-wrap gap-4">
            <span className="rounded-full bg-pink px-3 py-0.5 font-gmcafe text-base uppercase text-white md:px-4 md:py-1 md:text-xl">
              {lockedCount} Locked Moos
            </span>
            <span className="rounded-full bg-green-light px-3 py-0.5 font-gmcafe text-base uppercase text-white md:px-4 md:py-1 md:text-xl">
              {unlockedCount} Free Range Moos
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      title: 'Dashboard',
    },
  };
};
