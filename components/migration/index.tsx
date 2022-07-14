import classNames from 'classnames';
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import CustomConnectButton from '../CustomConnectButton';

const fakeSeaContract = '0x8d2372F1689B3cf8367E650814038E9473041Dbe';
export const gmooContractOwner = '0x51050ec063d393217B436747617aD1C2285Aeeee';
export const gmooContract = '0x51f806e65FdE63C6bE7DC75aBbA7fcE0918B13Dc';

const fakeSeaABI = ['function setApprovalForAll(address _operator, bool _approved) external'];
export const gmooABI = [
  'function getMigratableTokens(address sender) public view returns (uint256[] memory tokens)',
  'function isMigrationApproved(address sender) public view returns (bool)',
  'function migrateMoo(uint256 token) public',
  'function migrateMoos(uint256[] calldata tokens) public',
  'function getWallet(address owner) public view returns (uint256[] memory moos, uint256 touched)',
];

type StateProps = {
  next: () => void;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
};

export const Connect = () => {
  return (
    <>
      <h1>GMOO!</h1>
      <p>Please connect your wallet to continue.</p>
      <CustomConnectButton className="max-w-max self-end" variation="migration" />
    </>
  );
};

export const Approve = ({ next, setLoading }: StateProps) => {
  const { data, isLoading, write, isSuccess } = useContractWrite({
    addressOrName: fakeSeaContract,
    contractInterface: fakeSeaABI,
    functionName: 'setApprovalForAll',
  });

  const { isFetched } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      if (isFetched) {
        setLoading && setLoading(false);
        next();
      } else {
        setLoading && setLoading(true);
      }
    }
  }, [isSuccess, next, setLoading, isFetched]);

  return (
    <>
      <p>Please grant your approval to start the moogration process.</p>
      <Button onClick={() => write({ args: [gmooContract, true] })} loading={isLoading}>
        Approve
      </Button>
    </>
  );
};

type MigrateProps = StateProps & {
  tokens: string[];
};

export const Migrate = ({ next, tokens, setLoading }: MigrateProps) => {
  const { data, isLoading, write, isSuccess } = useContractWrite({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: tokens.length > 1 ? 'migrateMoos' : 'migrateMoo',
  });

  const { isFetched } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      if (isFetched) {
        setLoading && setLoading(false);
        next();
      } else {
        setLoading && setLoading(true);
      }
    }
  }, [isSuccess, next, setLoading, isFetched]);

  return (
    <>
      <h1>Approved!</h1>
      <p>Are you ready to enter the moogical portal?</p>
      <Button
        onClick={() => write({ args: tokens.length > 1 ? [tokens] : tokens[0] })}
        loading={isLoading}
      >
        Migrate
      </Button>
    </>
  );
};

export const Migrating = () => {
  return (
    <>
      <h1>MOOOOOoooooOOoooo!</h1>
      <p>Moograting in progress...</p>
    </>
  );
};

export const Migrated = () => {
  return (
    <>
      <h1>CONGRATULATIONS!</h1>
      <p>
        Your herd has successfully crossed the moogical portal and has safely landed in your wallet.
      </p>
    </>
  );
};

type ButtonProps = {
  children: ReactNode | ReactNode[];
  onClick: () => void;
  loading?: boolean;
};

const Button = ({ onClick, children, loading }: ButtonProps) => {
  return (
    <button
      className={classNames(
        { 'pointer-events-none': loading },
        'relative max-w-max self-end rounded bg-pink px-6 py-0.5 font-gmcafe text-base text-white'
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
