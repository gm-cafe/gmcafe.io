import { Dialog, Tab } from '@headlessui/react';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useState } from 'react';
import { LockAdvancedKeek, LockAdvancedMoo } from './LockAdvanced';
import { LockBasicKeek, LockBasicMoo } from './LockBasic';
import { CollectionType } from '../../lib/util/types';

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: CollectionType;
  refresh: Dispatch<void>;
};

const LockModal = ({ id, open, setOpen, type, refresh }: Props) => {
  const [disableClose, setDisableClose] = useState(false);

  const name = type === 'gmoo' ? 'Moo' : 'Keek';
  return (
    <Dialog open={open} onClose={() => !disableClose && setOpen(false)} className="relative z-10">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto mt-12 max-h-[80%] max-w-screen-md overflow-y-auto rounded-xl bg-white p-8">
          <Tab.Group>
            <div className="mb-2 flex flex-wrap gap-y-2">
              <Dialog.Title className="font-gmcafe text-4xl text-purple">Lock {name}</Dialog.Title>
              <Tab.List className="flex justify-center gap-2 md:ml-auto">
                <Tab>
                  {({ selected }) => (
                    <button
                      className={classNames(
                        'rounded px-3 py-1 font-gmcafe text-xl',
                        { 'bg-purple text-white ': selected },
                        { 'bg-purple/40 text-white ': !selected }
                      )}
                    >
                      Basic
                    </button>
                  )}
                </Tab>
                <Tab>
                  {({ selected }) => (
                    <button
                      className={classNames(
                        'rounded px-3 py-1 font-gmcafe text-xl',
                        { 'bg-purple text-white ': selected },
                        { 'bg-purple/40 text-white ': !selected }
                      )}
                    >
                      Advanced
                    </button>
                  )}
                </Tab>
              </Tab.List>
            </div>
            <Dialog.Description className="text-sm text-purple">
              Locking your {name} in the barn will add a layer of protection against the scares in
              the Web3 world. If you accidentally give permission for someone else to access your{' '}
              {name} (i.e. signing a setApprovalForAll transaction), this feature will help ensure
              your
              {name} stays safe in your wallet.
            </Dialog.Description>
            <Tab.Panels>
              <Tab.Panel>
                {type === 'gmoo' && (
                  <LockBasicMoo
                    id={id}
                    setDisableClose={setDisableClose}
                    setOpen={setOpen}
                    refresh={refresh}
                  />
                )}
                {type === 'keek' && (
                  <LockBasicKeek
                    id={id}
                    setDisableClose={setDisableClose}
                    setOpen={setOpen}
                    refresh={refresh}
                  />
                )}
              </Tab.Panel>
              <Tab.Panel>
                {type === 'gmoo' && (
                  <LockAdvancedMoo
                    id={id}
                    setDisableClose={setDisableClose}
                    setOpen={setOpen}
                    refresh={refresh}
                  />
                )}
                {type === 'keek' && (
                  <LockAdvancedKeek
                    id={id}
                    setDisableClose={setDisableClose}
                    setOpen={setOpen}
                    refresh={refresh}
                  />
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LockModal;
