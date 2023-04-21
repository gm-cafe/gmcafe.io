import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { CollectionType, Moo } from '../util/types';
import { gmooContract, gmooABI, keekContract, keekABI } from '../util/addresses';

export const useTokenURI = (type: CollectionType, id: number) => {
  const [metadata, setMetadata] = useState<Moo>();

  const { data: mooData } = useContractRead({
    address: gmooContract,
    abi: gmooABI,
    functionName: 'tokenURI',
    args: [BigNumber.from(id)],
    enabled: type === 'gmoo',
  });

  const { data: keekData } = useContractRead({
    address: keekContract,
    abi: keekABI,
    functionName: 'tokenURI',
    args: [BigNumber.from(id)],
    enabled: type === 'keek',
  });

  const data = mooData ?? keekData;

  const url = data?.toString();

  useEffect(() => {
    if (!url) {
      return;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(setMetadata);
  }, [url]);

  return metadata;
};
