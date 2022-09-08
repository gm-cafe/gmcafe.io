import { Dialog } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';
import LockAdvanced from './LockAdvanced';

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
          <LockAdvanced id={id} setOpen={setOpen} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LockModal;
