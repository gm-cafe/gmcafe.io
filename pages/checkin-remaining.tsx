import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { metadata } from '../lib/constants';

const CheckInRemaining: NextPage = () => {
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/checkin')
      .then((res) => res.json())
      .then((json) => setTokens(json.tokens));
  }, []);

  const assets = metadata.filter((asset) => !tokens.includes(asset.token));

  return (
    <>
      <Head>
        <title>Check In</title>
      </Head>
      <div className="mx-auto flex max-w-screen-xl flex-wrap justify-evenly gap-4 pt-40">
        {assets.map(({ imageUrl, name, token }) => (
          <div className="flex h-52 w-40 flex-col items-center gap-2" key={token}>
            <div className="w-full overflow-hidden rounded-full">
              <Image src={imageUrl} width={600} height={600} layout="responsive" alt={name} />
            </div>
            <div className="flex-1 text-center">{name}</div>
          </div>
        ))}
      </div>
      <div className="fixed right-4 bottom-4 flex h-20 w-20 items-center justify-center rounded-full bg-pink shadow">
        <span className="font-gmcafe text-4xl text-white">{assets.length}</span>
      </div>
    </>
  );
};

export default CheckInRemaining;
