import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import { useEffect, useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { DashboardItem } from '../components/dashboard/DashboardItem';
import { Token } from '../lib/util/types';
import { KEEK_SUPPLY, GMOO_SUPPLY } from '../lib/constants/config';
// import useGetHerd from '../lib/hooks/useGetHerd';
// import { gmooABI, gmooContract } from '../lib/util/addresses';
// import useGetKeeks from '../lib/hooks/useGetKeeks';
import CustomConnectButton from '../components/CustomConnectButton';
import { LoadingIcon } from '../components/Icons';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { toastError } from '../lib/util/toast';

type Locked = {
  keeks: number;
  moos: number;
}

const Dashboard = () => {
  const [hydrated, setHydrated] = useState(false);

  const { address, isConnected } = useAccount();
  const [keeks, setKeeks] = useState<Token[]>([]);
  const [moos, setMoos] = useState<Token[]>([]);
  const [locked, setLocked] = useState<Locked>();
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => setVersion(version+1), [version]);

  useEffect(() => {
    if (!address) return;
    fetch(`https://api.gmcafe.io/dashboard/wallet?owner=${address}`).then(r => r.json()).then(json => {
      setMoos(json.moos as Token[]);
      setKeeks(json.keeks as Token[]);
      setLocked(json.locked as Locked);
    }).catch(toastError);
  }, [address, version]);

  useEffect(() => setHydrated(true), []);

  const loading = isConnected && !locked;

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
          {!loading && moos.map((x, i) => <DashboardItem type="gmoo" token={x} refresh={refresh} key={`m${i}`} />)}
          {!loading && keeks.map((x, i) => <DashboardItem type="keek" token={x} refresh={refresh} key={`k${i}`} />)}
          {locked && moos.length === 0 && keeks.length === 0 && (
            <h2 className="my-2 text-center font-gmcafe text-xl text-purple md:text-3xl">
              No Moos or Keeks found in your wallet...
            </h2>
          )}
          {loading && <LoadingIcon className="mx-auto mb-6 mt-4 h-8 w-8 text-purple" />}
        </div>
        {(locked && (moos.length || keeks.length)) && (
          <div className="flex gap-2 md:gap-4">
            <div className="flex items-center gap-1 rounded-xl bg-white px-3 py-0.5 font-gmcafe text-base uppercase text-purple md:py-1 md:pl-2 md:pr-1 md:text-xl">
              <div className="mr-1 w-6 shrink-0">
                <Image
                  src="/dashboard/gmoo.png"
                  layout="responsive"
                  width={256}
                  height={256}
                  alt="Moo Icon"
                />
              </div>
              <span className="inline-flex gap-1 rounded-lg bg-pink px-2 text-white">
                {locked.moos} <LockClosedIcon className="w-4" />
              </span>
              <span className="inline-flex gap-1 rounded-lg bg-green-light px-2 text-white">
                {GMOO_SUPPLY - locked.moos} <LockOpenIcon className="w-4" />
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-xl bg-white px-3 py-0.5 font-gmcafe text-base uppercase text-purple md:py-1 md:pl-2 md:pr-1 md:text-xl">
              <div className="mr-1 w-6 shrink-0">
                <Image
                  src="/dashboard/keek.png"
                  layout="responsive"
                  width={256}
                  height={256}
                  alt="Keek Icon"
                />
              </div>
              <span className="inline-flex gap-1 rounded-lg bg-pink px-2 text-white">
                {locked.keeks} <LockClosedIcon className="w-4" />
              </span>
              <span className="inline-flex gap-1 rounded-lg bg-green-light px-2 text-white">
                {KEEK_SUPPLY - locked.keeks} <LockOpenIcon className="w-4" />
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
