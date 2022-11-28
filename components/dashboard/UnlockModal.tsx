import { Dialog, Tab } from '@headlessui/react';
import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import UnlockAdvanced from './UnlockAdvanced';
import UnlockBasic from './UnlockBasic';

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const UnlockModal = ({ id, open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-screen-sm rounded-xl bg-white p-8">
          <Tab.Group>
            <div className="mb-2 flex">
              <Dialog.Title className="font-gmcafe text-4xl text-purple">Unlock Moo</Dialog.Title>
              <Tab.List className="ml-auto flex justify-center gap-2">
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
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <UnlockBasic id={id} setOpen={setOpen} />
              </Tab.Panel>
              <Tab.Panel>
                <UnlockAdvanced id={id} open={open} setOpen={setOpen} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UnlockModal;
