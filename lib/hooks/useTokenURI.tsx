import { useEffect, useState } from 'react';
import { CollectionType, Token } from '../util/types';

export const useTokenURI = (type: CollectionType, id: number) => {
  const [metadata, setMetadata] = useState<Token>();

  const url = `https://api.gmcafe.io/metadata/info?${type === 'gmoo' ? 'moo' : 'keek'}=${id}`;

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
