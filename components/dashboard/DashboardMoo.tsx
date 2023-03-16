import { ArrowsExpandIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useContractRead from '../../lib/hooks/useContractRead';
import { Moo } from '../../lib/util/types';
import { MooState } from '../../pages/dashboard';
import LockModal from './LockModal';
import UnlockModal from './UnlockModal';

const idRegex = /#(\d{1,3})/;

const DashboardMooLoaded = ({ moo }: { moo: Moo }) => {
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  const { name, image } = moo;

  const idRegexCapture = idRegex.exec(name)?.at(1);
  const id = idRegexCapture ? parseInt(idRegexCapture) : 0;

  const { data } = useContractRead({
    functionName: 'getMoo',
    args: [id],
    watch: true,
  });

  const isLocked = !!data?.isLocked;

  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4">
      <div className="w-12 shrink-0">
        <Image
          className="rounded-full"
          src={image}
          layout="responsive"
          width={300}
          height={300}
          alt={name}
        />
      </div>
      <div className="flex gap-4">
        <h2 className="font-gmcafe text-2xl text-purple md:text-2xl">{name}</h2>
        <span
          className={classNames(
            'hidden items-center justify-center rounded-full bg-purple px-3 pt-0.5 font-gmcafe text-xs text-white md:flex',
            { 'md:hidden': !isLocked }
          )}
        >
          LOCKED
        </span>
      </div>
      <div className="ml-auto flex gap-4 rounded-lg bg-gray-100 p-1">
        {isLocked && (
          <button onClick={() => setUnlockModalOpen(true)}>
            <LockOpenIcon
              className="w-8 cursor-pointer text-purple transition-transform hover:scale-105"
              onClick={() => setUnlockModalOpen(true)}
            />
          </button>
        )}
        {!isLocked && (
          <button onClick={() => setLockModalOpen(true)}>
            <LockClosedIcon className="w-8 cursor-pointer text-purple transition-transform hover:scale-105" />
          </button>
        )}
        <Link href={`/moo/${id}`}>
          <ArrowsExpandIcon className="w-8 cursor-pointer text-purple transition-transform hover:scale-105" />
        </Link>
      </div>
      <LockModal id={id} open={lockModalOpen} setOpen={setLockModalOpen} />
      <UnlockModal id={id} open={unlockModalOpen} setOpen={setUnlockModalOpen} />
    </div>
  );
};

const DashboardMooLoading = () => {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4">
      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200"></div>
      <h2 className="font-gmcafe text-2xl text-purple">Loading...</h2>
    </div>
  );
};

const DashboardMoo = ({ moo }: { moo: MooState }) => {
  if (typeof moo === 'number' || moo === true) {
    return <DashboardMooLoading />;
  } else {
    return <DashboardMooLoaded moo={moo} />;
  }
};

export default DashboardMoo;
