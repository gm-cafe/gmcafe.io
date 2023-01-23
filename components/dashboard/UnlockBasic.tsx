import { LockOpenIcon } from '@heroicons/react/solid';
import { constants } from 'ethers';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { gmooContract, gmooABI } from '../../lib/util/addresses';
import { toastError, toastSuccess } from '../../lib/util/toast';
import { LoadingIcon } from '../Icons';

type Props = {
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const UnlockBasic = ({ id, setOpen }: Props) => {
  const [loading, setLoading] = useState(false);

  const {
    write: unlock,
    data,
    isSuccess,
    isError,
  } = useContractWrite({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'unlockMoo',
    onError: toastError,
  });

  const { isSuccess: unlockSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if ((isSuccess && unlockSuccess) || isError) {
      setLoading(false);
      setOpen(false);
      unlockSuccess && toastSuccess('Unlocked Moo!');
    }
  }, [isSuccess, setLoading, unlockSuccess, isError, setOpen]);

  const onClick = () => {
    setLoading(true);
    unlock({ args: [id, '', constants.AddressZero] });
  };

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-6">
      <button
        className="flex items-center gap-2 rounded-lg bg-purple py-2 pl-4 pr-6"
        onClick={onClick}
        disabled={loading}
      >
        {!loading && <LockOpenIcon className="h-8 w-8 text-white" />}
        {loading && <LoadingIcon className="static" />}
        <span className="font-gmcafe text-3xl text-white">Unlock</span>
      </button>
      <div className="text-purple">
        <h3 className="font-semibold">
          Are you sure you want to set your Moo free into the pastures?
        </h3>
        <p className="text-sm">
          This will allow you to sell on marketplaces and enable transfers. Your Moo will not be
          protected against standard wallet drainers anymore.
        </p>
      </div>
    </div>
  );
};

export default UnlockBasic;
