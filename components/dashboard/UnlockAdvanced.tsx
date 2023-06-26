import { CheckIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { BigNumber, constants, utils } from 'ethers';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { Address } from '../../lib/util/address';
import { gmooContract, gmooABI, keekContract, keekABI } from '../../lib/util/addresses';
import { toastSuccess } from '../../lib/util/toast';
import { LoadingIcon } from '../Icons';
import { CollectionType } from '../../lib/util/types';

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refresh: Dispatch<void>;
};

export const UnlockAdvancedMoo = ({ id, open, setOpen, refresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [payBounty, setPayBounty] = useState(false);
  const [changeDestination, setChangeDestination] = useState(false);
  const [destination, setDestination] = useState<string>(constants.AddressZero);

  const { data } = useContractRead({
    address: gmooContract,
    abi: gmooABI,
    functionName: 'getMoo',
    args: [BigNumber.from(id)],
    enabled: open,
  });

  const unlockPriceWei: BigNumber = data?.unlockPrice || constants.Zero;
  const unlockPrice = utils.formatEther(unlockPriceWei);
  const value = payBounty ? unlockPriceWei : undefined;

  const { config } = usePrepareContractWrite({
    address: gmooContract,
    abi: gmooABI,
    functionName: 'unlockMoo',
    args: [BigNumber.from(id), password, destination as Address],
    overrides: value
      ? {
          value: value,
        }
      : undefined,
  });

  const {
    write: unlock,
    data: writeData,
    isSuccess: writeSuccess,
  } = useContractWrite({
    ...config,
    onError: () => {
      setLoading(false);
      setOpen(false);
    },
  });

  const { isSuccess: unlockSuccess } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  useEffect(() => {
    if (!writeSuccess || !unlockSuccess) {
      return;
    }

    setLoading(false);
    setOpen(false);
	refresh();
    toastSuccess('Unlocked!');
  }, [writeSuccess, unlockSuccess, setOpen]);

  const onClick = () => {
    setLoading(true);
    unlock?.();
  };

  const onChangeDestination = () => {
    if (changeDestination) {
      setDestination(constants.AddressZero);
      setChangeDestination(false);
    } else {
      setDestination(constants.AddressZero);
      setChangeDestination(true);
    }
  };

  const isValidDestination = destination === '' || utils.isAddress(destination);

  return (
    <Shared
      payBounty={payBounty}
      setPayBounty={setPayBounty}
      password={password}
      setPassword={setPassword}
      changeDestination={changeDestination}
      onChangeDestination={onChangeDestination}
      destination={destination}
      setDestination={setDestination}
      isValidDestination={isValidDestination}
      unlockPrice={unlockPrice}
      setOpen={setOpen}
      loading={loading}
      onClick={onClick}
      type="gmoo"
    />
  );
};

export const UnlockAdvancedKeek = ({ id, open, setOpen }: Props) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [payBounty, setPayBounty] = useState(false);
  const [changeDestination, setChangeDestination] = useState(false);
  const [destination, setDestination] = useState<string>('');

  const { data } = useContractRead({
    address: keekContract,
    abi: keekABI,
    functionName: 'getKeekInfo',
    args: [BigNumber.from(id)],
    enabled: open,
  });

  const unlockPriceWei: BigNumber = data?.unlockPrice || constants.Zero;
  const unlockPrice = utils.formatEther(unlockPriceWei);
  const value = payBounty ? unlockPriceWei : undefined;

  const { config } = usePrepareContractWrite({
    address: keekContract,
    abi: keekABI,
    functionName: 'unlockKeek',
    args: [BigNumber.from(id), password, (destination as Address) || constants.AddressZero],
    overrides: value
      ? {
          value: value,
        }
      : undefined,
  });

  const {
    write: unlock,
    data: writeData,
    isSuccess: writeSuccess,
  } = useContractWrite({
    ...config,
    onError: () => {
      setLoading(false);
      setOpen(false);
    },
  });

  const { isSuccess: unlockSuccess } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  useEffect(() => {
    if (!writeSuccess || !unlockSuccess) {
      return;
    }

    setLoading(false);
    setOpen(false);
	refresh();
    toastSuccess('Unlocked!');
  }, [writeSuccess, unlockSuccess, setOpen]);

  const onClick = () => {
    setLoading(true);
    unlock?.();
  };

  const onChangeDestination = () => {
    if (changeDestination) {
      setDestination(constants.AddressZero);
      setChangeDestination(false);
    } else {
      setDestination(constants.AddressZero);
      setChangeDestination(true);
    }
  };

  const isValidDestination = destination === '' || utils.isAddress(destination);

  return (
    <Shared
      payBounty={payBounty}
      setPayBounty={setPayBounty}
      password={password}
      setPassword={setPassword}
      changeDestination={changeDestination}
      onChangeDestination={onChangeDestination}
      destination={destination}
      setDestination={setDestination}
      isValidDestination={isValidDestination}
      unlockPrice={unlockPrice}
      setOpen={setOpen}
      loading={loading}
      onClick={onClick}
      type="keek"
    />
  );
};

type SharedProps = {
  payBounty: boolean;
  setPayBounty: Dispatch<SetStateAction<boolean>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  changeDestination: boolean;
  onChangeDestination: () => void;
  destination: string;
  setDestination: Dispatch<SetStateAction<string>>;
  isValidDestination: boolean;
  unlockPrice: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  onClick: () => void;
  type: CollectionType;
};

const Shared = ({
  payBounty,
  setPayBounty,
  password,
  setPassword,
  changeDestination,
  onChangeDestination,
  destination,
  setDestination,
  isValidDestination,
  unlockPrice,
  setOpen,
  loading,
  onClick,
  type,
}: SharedProps) => {
  const name = type === 'gmoo' ? 'Moo' : 'Keek';

  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <div className="my-4 flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex">
          <label className="font-gmcafe text-lg text-purple" htmlFor="unlockPassword">
            Password
          </label>
          {!forgotPassword && (
            <button
              type="button"
              className="ml-auto w-max text-xs text-purple"
              onClick={() => setForgotPassword(true)}
            >
              Forgot password?
            </button>
          )}
        </div>
        <input
          className="rounded border-2 border-purple bg-white px-2 py-1 text-purple disabled:bg-gray-100"
          type="password"
          id="unlockPassword"
          disabled={payBounty}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!forgotPassword && !password && (
          <span className="text-right text-xs text-pink">Password cannot be empty.</span>
        )}
      </div>
      {forgotPassword && (
        <div className="flex flex-col">
          <label className="flex items-center gap-2 font-gmcafe text-purple">
            <input
              className="absolute h-4 w-4 cursor-pointer opacity-0"
              type="checkbox"
              checked={payBounty}
              onClick={() => setPayBounty(!payBounty)}
            />
            <div
              className={classNames(
                'flex h-4 w-4 items-center justify-center rounded-sm border-2 border-purple',
                { 'bg-white': !payBounty },
                { 'bg-purple': payBounty }
              )}
              onClick={() => setPayBounty(!payBounty)}
            >
              <CheckIcon
                className={classNames('text-white', { hidden: !payBounty }, { block: payBounty })}
              />
            </div>
            Skip password and pay bounty
          </label>
          <p className="text-sm text-purple">
            You previously set a lock price of {unlockPrice} Ξ. By selecting this checkbox you agree
            to pay the lock price instead of unlocking your {name} with a password. Open a ticket in
            GMCafé Discord to have your Ether sent back to you.
          </p>
        </div>
      )}
      <div className="flex flex-col">
        <label className="flex items-center gap-2 font-gmcafe text-purple">
          <input
            className="absolute h-4 w-4 cursor-pointer opacity-0"
            type="checkbox"
            checked={changeDestination}
            onClick={onChangeDestination}
          />
          <div
            className={classNames(
              'flex h-4 w-4 items-center justify-center rounded-sm border-2 border-purple',
              { 'bg-white': !changeDestination },
              { 'bg-purple': changeDestination }
            )}
            onClick={onChangeDestination}
          >
            <CheckIcon
              className={classNames(
                'text-white',
                { hidden: !changeDestination },
                { block: changeDestination }
              )}
            />
          </div>
          Send {name} to different address
        </label>
        <p className="text-sm text-purple">
          By selecting this checkbox you agree to have your {name} sent to a different address (e.g.
          if your current wallet is compromised)
        </p>
      </div>
      {changeDestination && (
        <div className="flex flex-col">
          <label className="font-gmcafe text-lg text-purple" htmlFor="destination">
            Address
          </label>
          <input
            className="rounded border-2 border-purple bg-white px-2 py-1 text-purple disabled:bg-gray-200"
            id="destination"
            name="destination"
            value={destination}
            onChange={({ target: { value } }) => setDestination(value)}
          />
          {!isValidDestination && (
            <span className="text-right text-xs text-pink">
              Destination is not a valid address.
            </span>
          )}
        </div>
      )}
      <div className="mt-2 flex justify-end gap-4">
        <button
          onClick={() => setOpen(false)}
          className="cursor-pointer rounded-lg border-2 border-purple px-4 py-1 font-gmcafe text-xl text-purple"
        >
          Cancel
        </button>
        <button
          className="cursor-pointer rounded-lg bg-purple px-4 py-1 font-gmcafe text-xl text-white"
          disabled={loading || !isValidDestination || !password}
          onClick={onClick}
        >
          {loading ? <LoadingIcon /> : 'Unlock'}
        </button>
      </div>
    </div>
  );
};
