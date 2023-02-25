import { Dialog, Tab } from '@headlessui/react';
import { BigNumber } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import useContractRead from '../../lib/hooks/useContractRead';
import UnlockAdvanced from './UnlockAdvanced';
import UnlockBasic from './UnlockBasic';

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const UnlockModal = ({ id, open, setOpen }: Props) => {
  const { data } = useContractRead({
    functionName: 'getMoo',
    args: id,
    enabled: open,
  });

  const isAdvanced =
    BigNumber.isBigNumber(data?.unlockPrice) && !BigNumber.from(data?.unlockPrice).isZero();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto mt-12 w-full max-w-screen-sm rounded-xl bg-white p-8">
          <Tab.Group>
            <div className="mb-2 flex justify-between gap-y-2">
              <Dialog.Title className="font-gmcafe text-4xl text-purple">Unlock Moo</Dialog.Title>
              <div>
                <div className="rounded bg-purple px-3 py-1 font-gmcafe text-xl text-white">
                  {isAdvanced ? 'Advanced' : 'Basic'}
                </div>
              </div>
            </div>
            {!isAdvanced && <UnlockBasic id={id} setOpen={setOpen} />}
            {isAdvanced && <UnlockAdvanced id={id} open={open} setOpen={setOpen} />}
          </Tab.Group>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UnlockModal;
