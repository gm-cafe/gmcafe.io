import { BigNumber } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { useEnsAddress } from 'wagmi';
import useContractRead from '../hooks/useContractRead';

// Returns a list of moos based on the argument
// The argument can be either an ENS name or an address
const useAddressToMoos = (name: string) => {
  const { data: ensResult } = useEnsAddress({
    name,
    enabled: name.includes('.eth'),
  });

  const { data } = useContractRead({
    functionName: 'getWallet',
    args: ensResult || name.toLowerCase(),
    enabled: !!ensResult || isAddress(name.toLowerCase()),
  });

  const moos: number[] = data?.moos.map((moo: BigNumber) => moo.toNumber()) || [];

  return moos;
};

export default useAddressToMoos;
