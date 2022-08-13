import { Dialog } from '@headlessui/react';
import { ArrowsExpandIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/solid';
import { utils } from 'ethers';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import { gmooABI, gmooContract } from '../../lib/util/addresses';
import { Attribute, Moo } from '../../lib/util/types';
import { MooState } from '../../pages/dashboard';

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

  const { write: lock } = useContractWrite({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'lockMoo',
  });

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
          <Dialog.Panel className="mx-auto max-w-screen-sm rounded-xl bg-white p-8">
            <Dialog.Title className="font-gmcafe text-3xl text-purple">Lock Moo</Dialog.Title>
            <Dialog.Description className="text-purple">
              Locking your moo will give you special benefits...
            </Dialog.Description>
            <Formik
              initialValues={{
                tokenId: id,
                lockPrice: 0,
                lockPassword: '',
              }}
              onSubmit={async ({ tokenId, lockPrice, lockPassword }) => {
                const priceInGwei = lockPrice * Math.pow(10, 9);
                const hashedPassword = utils.keccak256(utils.toUtf8Bytes(lockPassword));
                lock({
                  args: [tokenId, priceInGwei, hashedPassword],
                });
              }}
              onReset={(values, actions) => {
                actions.setValues({
                  tokenId: id,
                  lockPrice: 0,
                  lockPassword: '',
                });
                setLockModalOpen(false);
              }}
            >
              <Form className="my-4 flex flex-col gap-4">
                <div className="flex">
                  <div className="flex flex-1 flex-col">
                    <label className="px-2 font-gmcafe text-lg text-purple" htmlFor="tokenId">
                      ID
                    </label>
                    <Field
                      className="cursor-not-allowed rounded border-2 border-purple bg-gray-100 py-1 px-2 text-purple"
                      type="number"
                      id="tokenId"
                      name="tokenId"
                      disabled
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <label className="font-gmcafe text-lg text-purple" htmlFor="lockPrice">
                      Price
                    </label>
                    <Field
                      className="rounded border-2 border-purple bg-white py-1 px-2 text-purple"
                      type="number"
                      id="lockPrice"
                      name="lockPrice"
                      step="any"
                      required
                      min={0}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-gmcafe text-lg text-purple" htmlFor="lockPassword">
                      Password
                    </label>
                    <Field
                      className="rounded border-2 border-purple bg-white py-1 px-2 text-purple"
                      type="password"
                      id="lockPassword"
                      name="lockPassword"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Field
                    className="cursor-pointer rounded-xl border-2 border-purple px-4 py-1 font-gmcafe text-xl text-purple"
                    type="reset"
                    value="Cancel"
                  />
                  <Field
                    className="cursor-pointer rounded-xl bg-purple px-4 py-1 font-gmcafe text-xl text-white"
                    type="submit"
                    value="Lock"
                  />
                </div>
              </Form>
            </Formik>
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
