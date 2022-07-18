import classNames from 'classnames';
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { LoadingState } from '../../pages/migrate';
import CustomConnectButton from '../CustomConnectButton';
import Typewriter from 'typewriter-effect';

export const fakeSeaContract = '0x8d2372F1689B3cf8367E650814038E9473041Dbe';
export const gmooContractOwner = '0x51050ec063d393217B436747617aD1C2285Aeeee';
export const gmooContract = '0xA7b92650CB392fBeFCb8fc02E32BAbDe854742F1';

const fakeSeaABI = [
  'function isApprovedForAll(address account, address operator) public view virtual override returns (bool)',
  'function setApprovalForAll(address _operator, bool _approved) external',
];
export const gmooABI = [
  'function _claimableTime() public view returns (uint256)',
  'function getMigratableTokens(address sender) public view returns (uint256[] memory tokens, uint256[] memory moos)',
  'function isMigrationApproved(address sender) public view returns (bool)',
  'function migrateMoo(uint256 token) public',
  'function migrateMoos(uint256[] calldata tokens) public',
  'function getWallet(address owner) public view returns (uint256[] memory moos, uint256 touched)',
];

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
    addressOrName: fakeSeaContract,
    contractInterface: fakeSeaABI,
    functionName: 'setApprovalForAll',
  });

  const { address } = useAccount();
  const { data: alreadyApproved } = useContractRead({
    addressOrName: fakeSeaContract,
    contractInterface: fakeSeaABI,
    functionName: 'isApprovedForAll',
    args: [address, gmooContract],
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
        onClick={() => write({ args: [gmooContract, true] })}
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
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: tokens.length > 1 ? 'migrateMoos' : 'migrateMoo',
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
      <Button
        className="mt-auto"
        onClick={() => write({ args: tokens.length > 1 ? [tokens] : tokens[0] })}
        loading={isLoading}
      >
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
        {loading && <LoadingIcon />}
      </span>
    </button>
  );
};

const LoadingIcon = () => {
  return (
    <svg
      className="absolute inset-auto h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
