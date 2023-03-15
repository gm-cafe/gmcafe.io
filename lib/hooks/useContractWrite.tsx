import { ContractInterface } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { useContractWrite as useWagmiContractWrite } from 'wagmi';
import { gmooABI, gmooContract } from '../util/addresses';
import { toastError } from '../util/toast';

type Arguments = {
  functionName: string;
  addressOrName?: string;
  contractInterface?: ContractInterface;
  args?: any;
  onSuccess?: () => void;
  onError?: (_err: Error) => void;
};

const useContractWrite = ({
  functionName,
  addressOrName = gmooContract,
  contractInterface = gmooABI,
  args,
  onSuccess,
  onError,
}: Arguments) =>
  useWagmiContractWrite({
    functionName,
    addressOrName,
    contractInterface,
    args,
    onSuccess,
    onError: (err) => {
      toastError(err);
      onError && onError(err);
    },
  });

export default useContractWrite;
