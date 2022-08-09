import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead, useContractReads } from 'wagmi';
import { gmooABI, gmooContract } from '../lib/util/addresses';
import { Moo } from '../lib/util/types';

type AsyncState = 'initialized' | 'loading' | 'loaded';

const Dashboard = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [moos, setMoos] = useState<Moo[]>([]);
  const [mooIds, setMooIds] = useState<number[]>([]);
  const [mooState, setMooState] = useState<AsyncState[]>([]);
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

      setMoos(Array(mooBigNs.length).fill(null));
      setMooIds(mooBigNs.map((n) => n.toNumber()));
      setMooState(Array(mooBigNs.length).fill('initialized'));
    },
  });

  useContractReads({
    contracts: mooIds.map((id) => ({
      addressOrName: gmooContract,
      contractInterface: gmooABI,
      functionName: 'tokenURI',
      args: [id],
    })),
    onSuccess: (tokenUriData) => {
      const mooTokenUris: string[] = tokenUriData?.map((result) => result.toString()) || [];
      mooTokenUris.forEach((tokenUri, idx) => {
        // Don't fetch again if moo id is fetching or already fetched
        if (mooState[idx] !== 'initialized') {
          return;
        }

        const front = moos.slice(0, idx);
        const back = moos.slice(idx + 1, moos.length);
        setMooState([
          ...mooState.slice(0, idx),
          'loading',
          ...mooState.slice(idx + 1, mooState.length + 1),
        ]);

        fetch(tokenUri)
          .then((res) => res.json())
          .then((moo: Moo) => {
            setMoos([...front, moo, ...back]);
            setMooState([
              ...mooState.slice(0, idx),
              'loaded',
              ...mooState.slice(idx + 1, mooState.length + 1),
            ]);
          });
      });
    },
  });

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
