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
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/solid';
import Image from 'next/image';

const Dashboard = () => {
  const [hydrated, setHydrated] = useState(false);

  const { address, isConnected } = useAccount();

  const herd = useGetHerd();

  const lockedMoos = herd.filter((moo) => moo.locked).length;
  const unlockedMoos = herd.length - lockedMoos;

  useEffect(() => setHydrated(true), []);

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

  return hydrated ? (
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
        {(moos.length > 0 || keeks.length > 0) && (
          <div className="flex gap-2 md:gap-4">
            <div className="flex items-center gap-1 rounded-xl bg-white px-3 py-0.5 font-gmcafe text-base uppercase text-purple md:py-1 md:pl-2 md:pr-1 md:text-xl">
              <div className="mr-1 w-6 shrink-0">
                <Image
                  src="/dashboard/gmoo.png"
                  layout="responsive"
                  width={300}
                  height={300}
                  alt="Moo Icon"
                />
              </div>
              <span className="inline-flex gap-1 rounded-lg bg-pink px-2 text-white">
                {lockedMoos} <LockClosedIcon className="w-4" />
              </span>
              <span className="inline-flex gap-1 rounded-lg bg-green-light px-2 text-white">
                {unlockedMoos} <LockOpenIcon className="w-4" />
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-xl bg-white px-3 py-0.5 font-gmcafe text-base uppercase text-purple md:py-1 md:pl-2 md:pr-1 md:text-xl">
              <div className="mr-1 w-6 shrink-0">
                <Image
                  src="/dashboard/keek.png"
                  layout="responsive"
                  width={300}
                  height={300}
                  alt="Keek Icon"
                />
              </div>
              <span className="inline-flex gap-1 rounded-lg bg-pink px-2 text-white">
                {lockedKeeks} <LockClosedIcon className="w-4" />
              </span>
              <span className="inline-flex gap-1 rounded-lg bg-green-light px-2 text-white">
                {unlockedKeeks} <LockOpenIcon className="w-4" />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      title: 'Dashboard',
    },
  };
};
