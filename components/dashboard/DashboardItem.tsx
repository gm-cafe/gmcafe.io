import { LockClosedIcon, LockOpenIcon, PencilIcon } from '@heroicons/react/solid';
//import classNames from 'classnames';
//import { BigNumber } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, useState } from 'react';
// import { useContractRead } from 'wagmi';
// import { gmooABI, gmooContract, keekABI, keekContract } from '../../lib/util/addresses';
// import { toastError } from '../../lib/util/toast';
import { CollectionType, Token } from '../../lib/util/types';
import LockModal from './LockModal';
import { UnlockModalMoo, UnlockModalKeek } from './UnlockModal';
import EditModal from './EditModal';

type Props = {
  token: Token;
  type: CollectionType;
  refresh: Dispatch<void>;
};

export const DashboardItem = ({ token, type, refresh }: Props) => {
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { name, id } = token;
  const isLocked = token.holder?.locked;
  const displayName = token.styledTitle ?? token.baseName;

  return (
    <div className="flex items-center gap-4 rounded-xl bg-white px-4 py-2">
      <div className="w-6 shrink-0 md:w-8">
        <Image
          src={`/dashboard/${type}.png`}
          layout="responsive"
          width={256}
          height={256}
          alt={name}
        />
      </div>
      <div className="w-12 shrink-0 md:w-16">
        <Image
          className="rounded-full"
          src={token.thumb}
          layout="responsive"
          width={256}
          height={256}
          alt={name}
          unoptimized
        />
      </div>
      <div className="flex gap-4">
        <Link href={`/${type === 'gmoo' ? 'moo' : 'keek'}/${id}`}>
          <h2 className="cursor-pointer font-gmcafe text-xl text-purple transition-colors hover:text-purple/70 md:text-2xl">
            {displayName}
          </h2>
        </Link>
      </div>
      <div className="ml-auto flex gap-2 p-1 md:gap-4">
        {isLocked && (
          <button
            onClick={() => setEditModalOpen(true)}
            className="group rounded-lg border-2 border-gray-100 bg-gray-100 p-1 transition-all hover:scale-110 hover:border-pink hover:bg-pink"
          >
            <PencilIcon className="w-6 cursor-pointer text-purple transition-transform hover:scale-105 group-hover:text-white md:w-8" />
          </button>
        )}
        {isLocked && (
          <button
            className="group rounded-lg border-2 border-gray-100 bg-gray-100 p-1 transition-all hover:scale-110 hover:border-pink hover:bg-pink"
            onClick={() => setUnlockModalOpen(true)}
          >
            <LockOpenIcon className="w-6 cursor-pointer text-purple transition-transform group-hover:hidden md:w-8" />
            <LockClosedIcon className="hidden w-6 cursor-pointer text-white transition-transform group-hover:block md:w-8" />
          </button>
        )}
        {!isLocked && (
          <button
            className="group rounded-lg border-2 border-purple bg-purple p-1 transition-all hover:scale-110 hover:border-pink hover:bg-pink"
            onClick={() => setLockModalOpen(true)}
          >
            <LockClosedIcon className="w-6 cursor-pointer text-white transition-transform group-hover:hidden md:w-8" />
            <LockOpenIcon className="hidden w-6 cursor-pointer text-white transition-transform group-hover:block md:w-8" />
          </button>
        )}
      </div>

      <LockModal
        id={id}
        open={lockModalOpen}
        setOpen={setLockModalOpen}
        type={type}
        refresh={refresh}
      />
      {type === 'gmoo' && (
        <UnlockModalMoo
          id={id}
          open={unlockModalOpen}
          setOpen={setUnlockModalOpen}
          refresh={refresh}
        />
      )}
      {type === 'keek' && (
        <UnlockModalKeek
          id={id}
          open={unlockModalOpen}
          setOpen={setUnlockModalOpen}
          refresh={refresh}
        />
      )}
      <EditModal
        id={id}
        open={editModalOpen}
        setOpen={setEditModalOpen}
        refresh={refresh}
        type={type}
      />
    </div>
  );
};

/*
const DashboardItemLoading = () => {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white px-4 py-2">
      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200"></div>
      <h2 className="font-gmcafe text-2xl text-purple">Loading...</h2>
    </div>
  );
};

export const DashboardMoo = ({ id }: { id: number }) => {
  const [moo, setMoo] = useState<Moo>();

  const { data: tokenUri } = useContractRead({
    address: gmooContract,
    abi: gmooABI,
    functionName: 'tokenURI',
    args: [BigNumber.from(id)],
  });

  const { data } = useContractRead({
    address: gmooContract,
    abi: gmooABI,
    functionName: 'getMoo',
    args: [BigNumber.from(id)],
    watch: true,
  });

  useEffect(() => {
    fetch(`https://api.gmcafe.io/metadata/info?moo=${id}`)
        .then((res) => res.json())
        .then((moo: Moo) => setMoo(moo))
        .catch(toastError);
  }, []);

  if (!moo) {
    return <DashboardItemLoading />;
  }

  return (<DashboardItemLoaded token={moo} isLocked={!!moo.holder?.locked} type="gmoo" />);
};

export const DashboardKeek = ({ id }: { id: number }) => {
  const [keek, setKeek] = useState<Keeku>();

  const { data: tokenUri } = useContractRead({
    address: keekContract,
    abi: keekABI,
    functionName: 'tokenURI',
    args: [BigNumber.from(id)],
  });

  const { data } = useContractRead({
    address: keekContract,
    abi: keekABI,
    functionName: 'getKeekInfo',
    args: [BigNumber.from(id)],
    watch: true,
  });

  useEffect(() => {
    fetch(tokenUri)
        .then((res) => res.json())
        .then((keek: Keeku) => setKeek(keek))
        .catch(toastError);
  }, [tokenUri]);

  if (!keek) {
    return <DashboardItemLoading />;
  } else {
    return (
      <DashboardItemLoaded
        token={keek}
        isLocked={!!data?.isLocked}
        type="keek"
      />
    );
  }
};
*/
