import { LockClosedIcon } from '@heroicons/react/solid';
import { constants } from 'ethers';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { gmooContract, gmooABI } from '../../lib/util/addresses';
import { toastError } from '../../lib/util/toast';
import { LoadingIcon } from '../Icons';

type Props = {
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LockBasic = ({ id, setOpen }: Props) => {
  const [loading, setLoading] = useState(false);

  const {
    write: lock,
    data,
    isSuccess,
    isError,
  } = useContractWrite({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'lockMoo',
    onError: toastError,
  });

  const { isSuccess: lockSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if ((isSuccess && lockSuccess) || isError) {
      setLoading(false);
      setOpen(false);
    }
  }, [isSuccess, setLoading, lockSuccess, isError, setOpen]);

  const onClick = () => {
    setLoading(true);
    lock({ args: [id, 0, constants.HashZero] });
  };

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-6">
      <button
        className="flex items-center gap-2 rounded-lg bg-purple py-2 pl-4 pr-6"
        onClick={onClick}
        disabled={loading}
      >
        {!loading && <LockClosedIcon className="h-8 w-8 text-white" />}
        {loading && <LoadingIcon className="static" />}
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
