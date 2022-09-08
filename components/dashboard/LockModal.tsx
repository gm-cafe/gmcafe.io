import { Dialog, Tab } from '@headlessui/react';
import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import LockAdvanced from './LockAdvanced';
import LockBasic from './LockBasic';

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LockModal = ({ id, open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-screen-sm rounded-xl bg-white p-8">
          <Dialog.Title className="font-gmcafe text-3xl text-purple">Lock Moo</Dialog.Title>
          <Dialog.Description className="text-purple">
            Locking your moo will give you special benefits...
          </Dialog.Description>
          <Tab.Group>
            <Tab.List className="my-4 flex justify-center gap-2">
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
              <Tab disabled>
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
            <Tab.Panels>
              <Tab.Panel>
                <LockBasic id={id} setOpen={setOpen} />
              </Tab.Panel>
              <Tab.Panel>
                <LockAdvanced id={id} setOpen={setOpen} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LockModal;
