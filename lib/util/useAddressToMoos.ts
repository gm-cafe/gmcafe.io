import { BigNumber, constants } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { useContractRead, useEnsAddress } from 'wagmi';
import { gmooABI, gmooContract } from './addresses';

// Returns a list of moos based on the argument
// The argument can be either an ENS name or an address
const useAddressToMoos = (name: string) => {
  const { data: ensResult } = useEnsAddress({
    name,
    enabled: name.includes('.eth'),
  });

  const { data } = useContractRead({
    address: gmooContract,
    abi: gmooABI,
    functionName: 'getWallet',
    args: [ensResult || constants.AddressZero],
    enabled: !!ensResult || isAddress(name.toLowerCase()),
  });

  const moos: number[] = data?.map((moo: BigNumber) => moo.toNumber()) || [];

  return moos;
};

export default useAddressToMoos;
