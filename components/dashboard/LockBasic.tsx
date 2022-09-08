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
    <div className="mt-8 flex items-center justify-center">
      <button
        className="flex items-center gap-2 rounded-lg bg-purple py-2 pl-4 pr-6"
        onClick={() => lock({ args: [id, 0, constants.HashZero] })}
      >
        <LockClosedIcon className="h-8 w-8 text-white" />
        <span className="font-gmcafe text-3xl text-white">Lock</span>
      </button>
    </div>
  );
};

export default LockBasic;
