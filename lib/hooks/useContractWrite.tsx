import { useContractWrite as useWagmiContractWrite, usePrepareContractWrite } from 'wagmi';
import { gmooABI, gmooContract } from '../util/addresses';
import { toastError } from '../util/toast';
import { Abi } from 'abitype';
import { BigNumber } from 'ethers';

type Arguments = {
  functionName: string;
  addressOrName?: `0x${string}`;
  contractInterface?: Abi;
  args?: any;
  onSuccess?: () => void;
  onError?: (_err: Error) => void;
  overrides?: {
    value?: BigNumber;
  };
};

const useContractWrite = ({
  functionName,
  addressOrName = gmooContract,
  contractInterface = gmooABI,
  args,
  onSuccess,
  onError,
  overrides,
}: Arguments) => {
  const { config } = usePrepareContractWrite({
    functionName,
    address: addressOrName,
    abi: contractInterface,
    args,
    onSuccess,
    onError: (err) => {
      toastError(err);
      onError && onError(err);
    },
    overrides,
  });

  return useWagmiContractWrite(config);
};

export default useContractWrite;
