import { ArrowsExpandIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Attribute, Moo } from '../../lib/util/types';
import { MooState } from '../../pages/dashboard';
import LockModal from './LockModal';
import UnlockModal from './UnlockModal';

const idRegex = /#(\d{1,3})/;

const checkLocked = (attributes: Attribute[]) =>
  attributes.find(({ trait_type }) => trait_type === 'Status')?.value === 'Locked 🔒';

const DashboardMooLoaded = ({ moo }: { moo: Moo }) => {
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  const { name, image, attributes } = moo;

  const idRegexCapture = idRegex.exec(name)?.at(1);
  const id = idRegexCapture ? parseInt(idRegexCapture) : 0;

  const isLocked = checkLocked(attributes);

  return (
    <div className="flex items-center gap-2 rounded-xl bg-white p-4">
      <div className="w-12">
        <Image
          className="rounded-full"
          src={image}
          layout="responsive"
          width={300}
          height={300}
          alt={name}
        />
      </div>
      <h2 className="font-gmcafe text-2xl text-purple">{name}</h2>
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
  return <div>Loading...</div>;
};

const DashboardMoo = ({ moo }: { moo: MooState }) => {
  if (typeof moo === 'number' || moo === true) {
    return <DashboardMooLoading />;
  } else {
    return <DashboardMooLoaded moo={moo} />;
  }
};

export default DashboardMoo;
