import { CheckIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { BigNumber, constants, utils } from 'ethers';
import { Dispatch, SetStateAction, useState } from 'react';
import useContractRead from '../../lib/hooks/useContractRead';
import useContractWrite from '../../lib/hooks/useContractWrite';
import { gmooContract, gmooABI } from '../../lib/util/addresses';
import { toastSuccess } from '../../lib/util/toast';
import { LoadingIcon } from '../Icons';

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const UnlockAdvanced = ({ id, open, setOpen }: Props) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [payBounty, setPayBounty] = useState(false);
  const [changeDestination, setChangeDestination] = useState(false);
  const [destination, setDestination] = useState(constants.AddressZero);

  const { write: unlock } = useContractWrite({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'unlockMoo',
    onSuccess: () => {
      setLoading(false);
      setOpen(false);
      toastSuccess('Unlocked Moo!');
    },
    onError: () => {
      setLoading(false);
      setOpen(false);
    },
    args: [id, password, destination],
  });

  const { data } = useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'getMoo',
    args: id,
    enabled: open,
  });

  const unlockPriceWei: BigNumber = data?.unlockPrice;
  const unlockPrice = utils.formatEther(unlockPriceWei);

  const onClick = () => {
    setLoading(true);
    unlock?.({
      recklesslySetUnpreparedOverrides: {
        value: payBounty ? unlockPriceWei : undefined,
      },
    });
  };

  const onChangeDestination = () => {
    if (changeDestination) {
      setDestination(constants.AddressZero);
      setChangeDestination(false);
    } else {
      setDestination('');
      setChangeDestination(true);
    }
  };

  const isValidDestination = destination.endsWith('.eth') || utils.isAddress(destination);

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
          className="rounded border-2 border-purple bg-white py-1 px-2 text-purple disabled:bg-gray-100"
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
            to pay the lock price instead of unlocking your moo with a password. Open a ticket in
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
          Send Moo to different address
        </label>
        <p className="text-sm text-purple">
          By selecting this checkbox you agree to have your Moo sent to a different address (e.g. if
          your current wallet is compromised)
        </p>
      </div>
      {changeDestination && (
        <div className="flex flex-col">
          <label className="font-gmcafe text-lg text-purple" htmlFor="destination">
            Address
          </label>
          <input
            className="rounded border-2 border-purple bg-white py-1 px-2 text-purple disabled:bg-gray-200"
            id="destination"
            name="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
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
          disabled={loading}
          onClick={onClick}
        >
          {loading ? <LoadingIcon /> : 'Unlock'}
        </button>
      </div>
    </div>
  );
};

export default UnlockAdvanced;
