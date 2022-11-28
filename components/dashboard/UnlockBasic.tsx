import { LockOpenIcon } from '@heroicons/react/solid';
import { constants } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import { useContractWrite } from 'wagmi';
import { gmooContract, gmooABI } from '../../lib/util/addresses';

type Props = {
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const UnlockBasic = ({ id, setOpen }: Props) => {
  const { write: unlock } = useContractWrite({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'unlockMoo',
    onSettled: () => setOpen(false),
  });

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-6">
      <button
        className="flex items-center gap-2 rounded-lg bg-purple py-2 pl-4 pr-6"
        onClick={() => unlock({ args: [id, '', constants.AddressZero] })}
      >
        <LockOpenIcon className="h-8 w-8 text-white" />
        <span className="font-gmcafe text-3xl text-white">Unlock</span>
      </button>
    </div>
  );
};

export default UnlockBasic;
