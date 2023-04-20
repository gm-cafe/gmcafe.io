import { BigNumber } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { useContractRead, useEnsAddress } from 'wagmi';
import { gmooABI, gmooContract } from './addresses';
import { CollectionType } from './types';
import useGetKeeks from '../hooks/useGetKeeks';
import { Address } from './address';

// Returns a list of moos or keeks based on the argument
// The argument can be either an ENS name or an address
const useAddressToIds = (name: string, type: CollectionType): number[] => {
  const { data: ensResult } = useEnsAddress({
    name,
    enabled: name.includes('.eth'),
  });

  const { data } = useContractRead({
    address: gmooContract,
    abi: gmooABI,
    functionName: 'getWallet',
    args: [ensResult || (name as Address)],
    enabled: !!ensResult || isAddress(name.toLowerCase()),
  });

  const moos: number[] = data?.map((moo: BigNumber) => moo.toNumber()) || [];

  const { data: parsedKeekus } = useGetKeeks();
  const keeks: number[] = parsedKeekus
    .filter((p) => p.owner.toLowerCase() === (ensResult || name).toLowerCase())
    .map((p) => p.token);

  return type === 'gmoo' ? moos : keeks;
};

export default useAddressToIds;
