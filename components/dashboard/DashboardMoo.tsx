import { Dialog } from '@headlessui/react';
import { ArrowsExpandIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Attribute, Moo } from '../../lib/util/types';
import { MooState } from '../../pages/dashboard';

const idRegex = /#(\d{1,3})/;

const checkLocked = (attributes: Attribute[]) =>
  attributes.find(({ trait_type }) => trait_type === 'Status')?.value === 'Locked 🔒';

const DashboardMooLoaded = ({ moo }: { moo: Moo }) => {
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

  const [lockPrice, setLockPrice] = useState<number>(0);
  const [lockPassword, setLockPassword] = useState<string>('');

  const { name, image, attributes } = moo;

  const idRegexCapture = idRegex.exec(name)?.at(1);
  const id = idRegexCapture ? parseInt(idRegexCapture) : 0;

  const isLocked = checkLocked(attributes);

  const lockMoo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const cancelLock = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLockPrice(0);
    setLockPassword('');
    setLockModalOpen(false);
  };

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
      <Dialog
        open={lockModalOpen}
        onClose={() => setLockModalOpen(false)}
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-screen-sm rounded-xl bg-white p-6">
            <Dialog.Title className="font-gmcafe text-3xl text-purple">Lock Moo</Dialog.Title>
            <Dialog.Description className="text-purple">
              Locking your moo will give you special benefits...
            </Dialog.Description>
            <form className="my-4 flex flex-col gap-4" onSubmit={lockMoo}>
              <div className="flex">
                <div className="flex flex-col">
                  <label className="px-2 font-gmcafe text-lg text-purple" htmlFor="tokenId">
                    ID
                  </label>
                  <input
                    className="cursor-not-allowed rounded border-2 border-purple bg-gray-100 py-1 px-2 text-purple"
                    type="number"
                    id="tokenId"
                    name="tokenId"
                    value={id}
                    min={0}
                    disabled
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <label className="font-gmcafe text-lg text-purple" htmlFor="price">
                    Price
                  </label>
                  <input
                    className="rounded bg-white py-1 px-2 text-purple outline outline-2 outline-purple"
                    type="number"
                    id="price"
                    name="price"
                    value={lockPrice}
                    step="any"
                    required
                    onChange={(e) => setLockPrice(parseFloat(e.target.value))}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-gmcafe text-lg text-purple" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="rounded bg-white py-1 px-2 text-purple outline outline-2 outline-purple"
                    type="password"
                    id="password"
                    name="password"
                    value={lockPassword}
                    onChange={(e) => setLockPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <input
                  className="cursor-pointer rounded-xl border-2 border-purple px-4 py-1 font-gmcafe text-xl text-purple"
                  type="button"
                  value="Cancel"
                  onClick={cancelLock}
                />
                <input
                  className="cursor-pointer rounded-xl bg-purple px-4 py-1 font-gmcafe text-xl text-white"
                  type="submit"
                  value="Lock"
                />
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
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
