import { BigNumber, utils } from 'ethers';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { gmooContract, gmooABI, keekContract, keekABI } from '../../lib/util/addresses';
import generatePassword from '../../lib/util/generatePassword';
import { toastError, toastSuccess } from '../../lib/util/toast';
import { LoadingIcon } from '../Icons';
import { ClipboardIcon } from '@heroicons/react/solid';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { Address } from '../../lib/util/address';
import { CollectionType } from '../../lib/util/types';

type Props = {
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const LockAdvancedMoo = ({ id, setOpen }: Props) => {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [password, setPassword] = useState(generatePassword());
  const [next, setNext] = useState(false);

  const priceInGwei = utils.parseEther(price.toString());
  const hashedPassword = utils.solidityKeccak256(['uint256', 'string'], [id, password]);

  const { config } = usePrepareContractWrite({
    address: gmooContract,
    abi: gmooABI,
    functionName: 'lockMoo',
    args: [BigNumber.from(id), priceInGwei, hashedPassword as Address],
  });

  const {
    write: lock,
    data,
    isSuccess: writeSuccess,
  } = useContractWrite({
    ...config,
    onError: (error) => {
      setLoading(false);
      setOpen(false);
      error && toastError(error);
    },
  });

  const { isSuccess: lockSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (!writeSuccess || !lockSuccess) {
      return;
    }

    setLoading(false);
    setOpen(false);
    toastSuccess('Locked!');
  }, [writeSuccess, lockSuccess, setOpen]);

  const onClick = () => {
    setLoading(true);
    lock?.();
  };

  const onNext = () => {
    setPassword(generatePassword());
    setConfirm(false);
    setNext(true);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(password);
    setConfirm(true);
  };

  return (
    <Shared
      price={price}
      setPrice={setPrice}
      password={password}
      loading={loading}
      confirm={confirm}
      next={next}
      setNext={setNext}
      setOpen={setOpen}
      onCopy={onCopy}
      onNext={onNext}
      onClick={onClick}
      type="gmoo"
    />
  );
};

export const LockAdvancedKeek = ({ id, setOpen }: Props) => {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [password, setPassword] = useState(generatePassword());
  const [next, setNext] = useState(false);

  const priceInGwei = utils.parseEther(price.toString());
  const hashedPassword = utils.solidityKeccak256(['uint256', 'string'], [id, password]);

  const { config } = usePrepareContractWrite({
    address: keekContract,
    abi: keekABI,
    functionName: 'lockKeek',
    args: [BigNumber.from(id), priceInGwei, hashedPassword as Address],
  });

  const {
    write: lock,
    data,
    isSuccess: writeSuccess,
  } = useContractWrite({
    ...config,
    onError: (error) => {
      setLoading(false);
      setOpen(false);
      error && toastError(error);
    },
  });

  const { isSuccess: lockSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (!writeSuccess || !lockSuccess) {
      return;
    }

    setLoading(false);
    setOpen(false);
    toastSuccess('Locked!');
  }, [writeSuccess, lockSuccess, setOpen]);

  const onClick = () => {
    setLoading(true);
    lock?.();
  };

  const onNext = () => {
    setPassword(generatePassword());
    setConfirm(false);
    setNext(true);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(password);
    setConfirm(true);
  };

  return (
    <Shared
      price={price}
      setPrice={setPrice}
      password={password}
      loading={loading}
      confirm={confirm}
      next={next}
      setNext={setNext}
      setOpen={setOpen}
      onCopy={onCopy}
      onNext={onNext}
      onClick={onClick}
      type="keek"
    />
  );
};

type SharedProps = {
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  password: string;
  loading: boolean;
  confirm: boolean;
  next: boolean;
  setNext: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onCopy: () => void;
  onNext: () => void;
  onClick: () => void;
  type: CollectionType;
};

const Shared = ({
  price,
  setPrice,
  password,
  loading,
  confirm,
  next,
  setNext,
  setOpen,
  onCopy,
  onNext,
  onClick,
  type,
}: SharedProps) => {
  const name = type === 'gmoo' ? '{name}' : 'Keek';

  return (
    <div className="my-4 flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-purple">
          Basic Lock is a great option to help protect against most phishing scams. However if your
          private key or seed phrase is compromised, then the scammer would still be able to unlock
          your cow from our website. With Advanced Lock, your cow would remain safe in your wallet.
        </p>
        {!next && (
          <p className="text-sm text-purple">
            To unlock your {name} in the future, you will either need to pay the Ether bounty chosen
            below or use the randomly generated passphrase on the next screen.
          </p>
        )}
        {!next && (
          <div className="flex flex-col">
            <label className="font-gmcafe text-lg text-purple" htmlFor="lockPrice">
              Price (Ether)
            </label>
            <div className="flex items-center gap-2 rounded border-2 border-purple">
              <input
                className="py-1 pl-2 text-purple focus-within:outline-0"
                type="number"
                id="lockPrice"
                name="lockPrice"
                required
                step={0.01}
                min={0}
                value={price}
                onChange={({ target: { value } }) =>
                  value ? setPrice(parseFloat(value)) : setPrice(0)
                }
              />
              <span className="pr-2 font-medium text-purple">Ξ</span>
            </div>
            {price <= 0 && (
              <span className="text-right text-xs text-pink">Price must be greater than 0.</span>
            )}
          </div>
        )}
        {!next && (
          <p className="text-sm text-purple">
            We recommend choosing a bounty that a scammer would be unlikely to pay. If opting to pay
            the bounty to unlock your {name}, your Ether will be sent to the GMCafé contract. Please
            open up a ticket in our Discord to have your Ether returned to you.
          </p>
        )}
        {next && (
          <div className="flex flex-col">
            <span className="text-sm text-purple">Your recovery phrase is:</span>
            <div className="mx-auto font-gmcafe text-6xl text-purple">{password}</div>
            <p className="text-sm text-purple">
              Please copy and save this passphrase somewhere safe, as you will need it to unlock
              your {name}. <b>You will not be able to retrieve this passphrase again.</b>
            </p>
          </div>
        )}
      </div>
      <div className="mt-2 flex justify-end gap-4">
        {next && (
          <button
            onClick={onCopy}
            className="mr-auto flex cursor-pointer items-center gap-x-2 rounded-lg bg-purple px-4 py-1 font-gmcafe text-xl text-white"
          >
            <ClipboardIcon className="h-4 w-4 text-white" />
            <span className="font-gmcafe text-lg text-white">{confirm ? 'Copied!' : 'Copy'}</span>
          </button>
        )}
        <button
          onClick={() => setOpen(false)}
          className="cursor-pointer rounded-lg border-2 border-purple px-4 py-1 font-gmcafe text-xl text-purple"
        >
          Cancel
        </button>
        {!next && (
          <button
            className="rounded-lg bg-purple px-4 py-1 font-gmcafe text-xl text-white transition-colors disabled:cursor-not-allowed disabled:bg-purple/60"
            disabled={price <= 0}
            onClick={onNext}
          >
            Next
          </button>
        )}
        {next && (
          <button
            onClick={() => setNext(false)}
            className="cursor-pointer rounded-lg border-2 border-purple px-4 py-1 font-gmcafe text-xl text-purple"
          >
            Back
          </button>
        )}
        {next && (
          <button
            className="cursor-pointer rounded-lg bg-purple px-4 py-1 font-gmcafe text-xl text-white"
            disabled={loading}
            onClick={onClick}
          >
            {loading ? <LoadingIcon /> : 'Lock'}
          </button>
        )}
      </div>
    </div>
  );
};
