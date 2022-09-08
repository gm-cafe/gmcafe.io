import { Dialog } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';
import UnlockAdvanced from './UnlockAdvanced';

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
          <Dialog.Title className="font-gmcafe text-3xl text-purple">Unlock Moo</Dialog.Title>
          <UnlockAdvanced id={id} open={open} setOpen={setOpen} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UnlockModal;
