import { BigNumber } from 'ethers';
import { useEnsAddress } from 'wagmi';
import useContractRead from '../hooks/useContractRead';

const useEnsToMoos = (name: string) => {
  const { data: ensResult } = useEnsAddress({
    name,
    enabled: name.length > 0,
  });

  const { data } = useContractRead({
    functionName: 'getWallet',
    args: ensResult,
    enabled: !!ensResult,
  });

  const moos: number[] = data?.moos.map((moo: BigNumber) => moo.toNumber()) || [];

  return moos;
};

export default useEnsToMoos;
