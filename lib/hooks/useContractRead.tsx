import { ContractInterface } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { useContractRead as useWagmiContractRead } from 'wagmi';
import { gmooABI, gmooContract } from '../util/addresses';
import { toastError } from '../util/toast';

type Arguments = {
  functionName: string;
  addressOrName?: string;
  contractInterface?: ContractInterface;
  args?: any;
  enabled?: boolean;
  onSuccess?: (_data: Result) => void;
  onError?: (_err: Error) => void;
  watch?: boolean;
};

const useContractRead = ({
  functionName,
  addressOrName = gmooContract,
  contractInterface = gmooABI,
  args,
  enabled,
  onError,
  onSuccess,
  watch,
}: Arguments) =>
  useWagmiContractRead({
    addressOrName,
    contractInterface,
    functionName,
    args,
    enabled,
    onSuccess,
    onError: (err) => {
      toastError(err);
      onError && onError(err);
    },
    watch,
  });

export default useContractRead;
