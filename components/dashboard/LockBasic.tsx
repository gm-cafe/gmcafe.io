import { LockClosedIcon } from '@heroicons/react/solid';
import { constants } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import { useContractWrite } from 'wagmi';
import { gmooContract, gmooABI } from '../../lib/util/addresses';

type Props = {
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LockBasic = ({ id, setOpen }: Props) => {
  const { write: lock } = useContractWrite({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'lockMoo',
    onSettled: () => setOpen(false),
  });

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-6">
      <button
        className="flex items-center gap-2 rounded-lg bg-purple py-2 pl-4 pr-6"
        onClick={() => lock({ args: [id, 0, constants.HashZero] })}
      >
        <LockClosedIcon className="h-8 w-8 text-white" />
        <span className="font-gmcafe text-3xl text-white">Lock</span>
      </button>
      <div className="text-purple">
        <h3 className="font-semibold">What does it mean to lock my Moo?</h3>
        <ul className="list-inside list-disc text-sm">
          <li>If you try to transfer a locked Moo, the transaction will fail.</li>
          <li>If your Moo is listed on a marketplace, no one will be able to purchase it.</li>
        </ul>
      </div>
      <div className="text-purple">
        <h3 className="font-semibold">Does this mean my Moo is 100% safe?</h3>
        <p className="text-sm">
          No. If you have already signed away access to your Moo, then you should make plans to
          transfer your Moo to a separate wallet when the coast is clear. With the basic lock
          function, the thief would be able to access this UI, unlock the Moo manually, then
          transfer the Moo elsewhere.
        </p>
      </div>
      <p className="w-full text-sm text-purple">
        Advanced lock is coming soon, which will add an extra layer of protection.
      </p>
    </div>
  );
};

export default LockBasic;
