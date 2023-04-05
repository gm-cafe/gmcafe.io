import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { keekABI, keekContract } from '../util/addresses';
import { ParsedKeeku } from '../util/types';

const useGetKeeks = (): ParsedKeeku[] => {
  const { data } = useContractRead({
    address: keekContract,
    abi: keekABI,
    functionName: 'keeksFromSlice',
    args: [BigNumber.from(0), BigNumber.from(3333)],
  });

  return (
    data?.map((row) => {
      const temp = parseInt(row.slice(6, 10), 16);

      return {
        owner: `0x${row.slice(26, 66)}`,
        block: parseInt(row.slice(18, 26), 16),
        transfers: parseInt(row.slice(10, 18), 16),
        tag: temp & 0x7fff,
        locked: (temp & 0x8000) > 0,
        pref: parseInt(row[5], 16),
        token: parseInt(row.slice(2, 5), 16),
      };
    }) || []
  );
};

export default useGetKeeks;
