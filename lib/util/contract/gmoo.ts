import { useEffect, useState } from 'react';
import useContractRead from '../../hooks/useContractRead';
import { gmooABI, gmooContract } from '../addresses';
import { Moo } from '../types';

export const useTokenURI = (id?: number) => {
  const [metadata, setMetadata] = useState<Moo>();

  const { data } = useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'tokenURI',
    args: id,
    enabled: !!id,
  });

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
