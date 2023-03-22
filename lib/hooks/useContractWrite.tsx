import { BigNumber, ContractInterface } from 'ethers';
import { useContractWrite as useWagmiContractWrite, usePrepareContractWrite } from 'wagmi';
import { gmooABI, gmooContract } from '../util/addresses';
import { toastError } from '../util/toast';

type Arguments = {
  functionName: string;
  addressOrName?: string;
  contractInterface?: ContractInterface;
  args?: any;
  overrides?: {
    value: BigNumber;
  };
  onSuccess?: () => void;
  onError?: (_err: Error) => void;
};

const useContractWrite = ({
  functionName,
  addressOrName = gmooContract,
  contractInterface = gmooABI,
  args,
  overrides,
  onSuccess,
  onError,
}: Arguments) => {
  const { config } = usePrepareContractWrite({
    functionName,
    addressOrName,
    contractInterface,
    args,
    overrides,
    onSuccess,
    onError: (err) => {
      toastError(err);
      onError && onError(err);
    },
  });

  return useWagmiContractWrite(config);
};

export default useContractWrite;
