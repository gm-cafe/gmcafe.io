import { LockOpenIcon } from '@heroicons/react/solid';
import { BigNumber, constants } from 'ethers';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { gmooContract, gmooABI, keekContract, keekABI } from '../../lib/util/addresses';
import { toastSuccess } from '../../lib/util/toast';
import { LoadingIcon } from '../Icons';
import { CollectionType } from '../../lib/util/types';

type Props = {
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refresh: Dispatch<void>;
};

export const UnlockBasicMoo = ({ id, setOpen, refresh }: Props) => {
  const [loading, setLoading] = useState(false);

  const { config } = usePrepareContractWrite({
    address: gmooContract,
    abi: gmooABI,
    functionName: 'unlockMoo',
    args: [BigNumber.from(id), '', constants.AddressZero],
  });

  const { write: unlock, data, isSuccess, isError } = useContractWrite(config);

  const { isSuccess: unlockSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if ((isSuccess && unlockSuccess) || isError) {
      setLoading(false);
      setOpen(false);
      refresh();
      unlockSuccess && toastSuccess('Unlocked!');
    }
  }, [isSuccess, setLoading, unlockSuccess, isError, setOpen, refresh]);

  const onClick = () => {
    setLoading(true);
    unlock?.();
  };

  return <Shared onClick={onClick} loading={loading} type="gmoo" />;
};

export const UnlockBasicKeek = ({ id, setOpen, refresh }: Props) => {
  const [loading, setLoading] = useState(false);

  const { config } = usePrepareContractWrite({
    address: keekContract,
    abi: keekABI,
    functionName: 'unlockKeek',
    args: [BigNumber.from(id), '', constants.AddressZero],
  });

  const { write: unlock, data, isSuccess, isError } = useContractWrite(config);

  const { isSuccess: unlockSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if ((isSuccess && unlockSuccess) || isError) {
      setLoading(false);
      setOpen(false);
      refresh();
      unlockSuccess && toastSuccess('Unlocked!');
    }
  }, [isSuccess, unlockSuccess, isError, setLoading, setOpen, refresh]);

  const onClick = () => {
    setLoading(true);
    unlock?.();
  };

  return <Shared onClick={onClick} loading={loading} type="keek" />;
};

type SharedProps = {
  onClick: () => void;
  loading: boolean;
  type: CollectionType;
};

const Shared = ({ onClick, loading, type }: SharedProps) => {
  const name = type === 'gmoo' ? 'Moo' : 'Keek';

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-6">
      <button
        className="flex items-center gap-2 rounded-lg bg-purple py-2 pl-4 pr-6"
        onClick={onClick}
        disabled={loading}
      >
        {!loading && <LockOpenIcon className="h-8 w-8 text-white" />}
        {loading && <LoadingIcon className="h-8 w-8 text-white" />}
        <span className="font-gmcafe text-3xl text-white">Unlock</span>
      </button>
      <div className="text-purple">
        <h3 className="font-semibold">
          Are you sure you want to set your {name} free into the pastures?
        </h3>
        <p className="text-sm">
          This will allow you to sell on marketplaces and enable transfers. Your {name} will not be
          protected against standard wallet drainers anymore.
        </p>
      </div>
    </div>
  );
};
