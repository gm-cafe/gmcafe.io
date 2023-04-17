import classNames from 'classnames';
import { constants } from 'ethers';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { DashboardMoo, DashboardKeek } from '../components/dashboard/DashboardItem';
import useGetHerd from '../lib/hooks/useGetHerd';
import { gmooABI, gmooContract } from '../lib/util/addresses';
import useGetKeeks from '../lib/hooks/useGetKeeks';
import CustomConnectButton from '../components/CustomConnectButton';
import { LoadingIcon } from '../components/Icons';

const Dashboard = () => {
  const [hasMounted, setHasMounted] = useState(false);

  const { address, isConnected } = useAccount();

  const herd = useGetHerd();

  const lockedMoos = herd.filter((moo) => moo.locked).length;
  const unlockedMoos = herd.length - lockedMoos;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { data, isLoading: gmooLoading } = useContractRead({
    address: gmooContract,
    abi: gmooABI,
    functionName: 'getWallet',
    enabled: isConnected,
    args: [address ? address : constants.AddressZero],
  });

  const moos = data?.map((d) => d.toNumber()) || [];

  const { data: allKeeks, loading: keekLoading } = useGetKeeks();
  const keeks = allKeeks
    .filter((k) => k.owner.toLowerCase() === address?.toLowerCase())
    .map((k) => k.token);

  const lockedKeeks = allKeeks.filter((keek) => keek.locked).length;
  const unlockedKeeks = allKeeks.length - lockedKeeks;

  const loading = isConnected && (gmooLoading || keekLoading);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center bg-pink-background pb-12 pt-40">
      <div className="mx-auto flex w-full max-w-screen-sm flex-col items-center justify-center px-4">
        <nav
          className={classNames(
            'flex w-full',
            { 'justify-end': isConnected },
            { 'justify-center': !isConnected }
          )}
        >
          <CustomConnectButton variation="mint" showAccount />
        </nav>
        <div className="my-4 flex w-full flex-col gap-4">
          {!loading && moos.map((moo, idx) => <DashboardMoo id={moo} key={idx} />)}
          {!loading && keeks.map((keek, idx) => <DashboardKeek id={keek} key={idx} />)}
          {!loading && isConnected && moos.length === 0 && keeks.length === 0 && (
            <h2 className="my-2 text-center font-gmcafe text-xl text-purple md:text-3xl">
              No Moos or Keeks found in your wallet...
            </h2>
          )}
          {loading && <LoadingIcon className="mx-auto mb-6 mt-4 h-8 w-8 text-purple" />}
        </div>
        <div className="flex flex-col gap-4">
          {moos.length > 0 && (
            <div className="flex flex-wrap gap-4">
              <span className="rounded-full bg-pink px-3 py-0.5 font-gmcafe text-base uppercase text-white md:px-4 md:py-1 md:text-xl">
                {lockedMoos} Locked Moos
              </span>
              <span className="rounded-full bg-green-light px-3 py-0.5 font-gmcafe text-base uppercase text-white md:px-4 md:py-1 md:text-xl">
                {unlockedMoos} Free Range Moos
              </span>
            </div>
          )}
          {keeks.length > 0 && (
            <div className="flex flex-wrap gap-4">
              <span className="rounded-full bg-pink px-3 py-0.5 font-gmcafe text-base uppercase text-white md:px-4 md:py-1 md:text-xl">
                {lockedKeeks} Locked Keeks
              </span>
              <span className="rounded-full bg-green-light px-3 py-0.5 font-gmcafe text-base uppercase text-white md:px-4 md:py-1 md:text-xl">
                {unlockedKeeks} Free Range Keeks
              </span>
            </div>
          )}
        </div>
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
