import { ContractInterface } from 'ethers';
import { useContractRead as useWagmiContractRead } from 'wagmi';
import { gmooABI, gmooContract } from '../util/addresses';
import { toastError } from '../util/toast';

type Arguments = {
  functionName: string;
  addressOrName?: string;
  contractInterface?: ContractInterface;
  args?: any;
  enabled?: boolean;
  onError?: (_err: Error) => void;
};

const useContractRead = ({
  functionName,
  addressOrName = gmooContract,
  contractInterface = gmooABI,
  args,
  enabled,
  onError,
}: Arguments) =>
  useWagmiContractRead({
    addressOrName,
    contractInterface,
    functionName,
    args,
    enabled,
    onError: (err) => {
      toastError(err);
      onError && onError(err);
    },
  });

export default useContractRead;
