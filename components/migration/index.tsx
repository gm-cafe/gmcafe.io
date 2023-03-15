import classNames from 'classnames';
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';
import { LoadingState } from '../../pages/migrate';
import CustomConnectButton from '../CustomConnectButton';
import Typewriter from 'typewriter-effect';
import { openSeaContract, openSeaABI, redeemContract, redeemABI } from '../../lib/util/addresses';
import { LoadingIcon } from '../Icons';
import useContractRead from '../../lib/hooks/useContractRead';
import useContractWrite from '../../lib/hooks/useContractWrite';

type StateProps = {
  next: () => void;
  loading?: LoadingState;
  setLoading?: Dispatch<SetStateAction<LoadingState>>;
};

export const Connect = () => {
  return (
    <>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(50)
            .typeString(
              'GMOO! Please connect your luxurious, lavender scented wallet to get started.'
            )
            .callFunction((obj) => {
              obj.elements.cursor.remove();
            })
            .start();
        }}
      />
      <CustomConnectButton className="mt-auto max-w-max self-end" variation="migration" />
    </>
  );
};

export const Approve = ({ next, setLoading }: StateProps) => {
  const { data, isLoading, write, isSuccess, isError } = useContractWrite({
    addressOrName: openSeaContract,
    contractInterface: openSeaABI,
    functionName: 'setApprovalForAll',
  });

  const { address } = useAccount();
  const { data: alreadyApproved } = useContractRead({
    addressOrName: openSeaContract,
    contractInterface: openSeaABI,
    functionName: 'isApprovedForAll',
    args: [address, redeemContract],
  });

  const { isFetched } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      if (isFetched) {
        setLoading && setLoading(undefined);
        next();
      } else {
        setLoading && setLoading('approve');
      }
    } else if (alreadyApproved) {
      next();
    } else if (isError) {
      // if user cancels tx, reset loading state
      setLoading && setLoading(undefined);
    }
  }, [isSuccess, next, setLoading, isFetched, alreadyApproved, isError]);

  return (
    <>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(50)
            .typeString('Welcome, tender Herd! Please grant approval to start the moogical portal.')
            .callFunction((obj) => {
              obj.elements.cursor.remove();
            })
            .start();
        }}
      />
      <Button
        className="mt-auto"
        onClick={() => write?.({ recklesslySetUnpreparedArgs: [redeemContract, true] })}
        loading={isLoading}
      >
        Approve
      </Button>
    </>
  );
};

type MigrateProps = StateProps & {
  tokens: string[];
};

export const Migrate = ({ next, tokens, loading, setLoading }: MigrateProps) => {
  const { data, isLoading, write, isSuccess, isError } = useContractWrite({
    addressOrName: redeemContract,
    contractInterface: redeemABI,
    functionName: 'redeemMoos',
  });

  const { isFetched } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isLoading) {
      setLoading && setLoading('migrate');
    } else if (isSuccess) {
      if (isFetched) {
        setLoading && setLoading(undefined);
        next();
      } else {
        setLoading && setLoading('migrate');
      }
    } else if (isError) {
      // if user cancels tx, reset loading state
      setLoading && setLoading(undefined);
    }
  }, [isSuccess, next, setLoading, isFetched, isLoading, isError]);

  if (loading === 'migrate') {
    return (
      <>
        <h1>MOOOOOoooooOOoooo!</h1>
        <p>Moograting in progress...</p>
      </>
    );
  }

  return (
    <>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(50)
            .typeString('Approved! You can now enter the magical portal to finalise moogration!')
            .callFunction((obj) => {
              obj.elements.cursor.remove();
            })
            .start();
        }}
      />
      <Button className="mt-auto" onClick={() => write?.({ recklesslySetUnpreparedArgs: [tokens] })} loading={isLoading}>
        Migrate
      </Button>
    </>
  );
};

export const Migrated = () => {
  return (
    <>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(50)
            .typeString(
              'CONGRATULATIONS! MOOOOO! Your succulent Herd has passed through the moogration portal and back into your luscious wallet! '
            )
            .callFunction((obj) => {
              obj.elements.cursor.remove();
            })
            .start();
        }}
      />
    </>
  );
};

export const NoMoo = () => {
  return (
    <>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(50)
            .typeString("Uh oh, this wallet doesn't seem to have any Moos in it..")
            .callFunction((obj) => {
              obj.elements.cursor.remove();
            })
            .start();
        }}
      />
    </>
  );
};

type ButtonProps = {
  className?: string;
  children: ReactNode | ReactNode[];
  onClick: () => void;
  loading?: boolean;
};

const Button = ({ className, onClick, children, loading }: ButtonProps) => {
  return (
    <button
      className={classNames(
        className,
        { 'pointer-events-none': loading },
        'text-shadow relative max-w-max self-end rounded-full bg-pink-light px-6 py-0.5 font-gmcafe text-base uppercase text-white'
      )}
      onClick={onClick}
      disabled={loading}
    >
      <span className={classNames({ 'opacity-0': loading })}>{children}</span>
      <span className="absolute top-0 right-0 flex h-full w-full items-center justify-center">
        {loading && <LoadingIcon className="absolute" />}
      </span>
    </button>
  );
};
