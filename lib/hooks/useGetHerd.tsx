import { ethers } from 'ethers';
import { useContractRead } from 'wagmi';
import { gmooContract, gmooABI } from '../util/addresses';
import { ParsedMoo } from '../util/types';

const useGetHerd = (): ParsedMoo[] => {
  const { data } = useContractRead({
    address: gmooContract,
    abi: gmooABI,
    functionName: 'getHerd',
  });

  return (
    data?.map((row) => ({
      locked: parseInt(row.slice(2, 3), 16) > 0,
      token: parseInt(row.slice(3, 6), 16),
      tag: parseInt(row.slice(6, 10), 16),
      transfers: parseInt(row.slice(10, 18), 16),
      block: parseInt(row.slice(18, 26), 16),
      owner: ethers.utils.getAddress(row.slice(26)),
    })) || []
  );
};

export default useGetHerd;
