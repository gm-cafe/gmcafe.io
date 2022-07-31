import { ExternalLinkIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { DiscordIcon, TwitterIcon } from '../components/Icons';
import { metadata } from '../lib/constants';
import { AssetsWithSocials, socials } from '../lib/util/socials';

const CheckInRemaining: NextPage = () => {
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/checkin')
      .then((res) => res.json())
      .then((json) => setTokens(json.tokens));
  }, []);

  const assets =
    tokens.length === 0 ? [] : metadata.filter((asset) => !tokens.includes(asset.token));
  const assetsWithSocials = assets.map<AssetsWithSocials>((asset) => {
    const social = socials.find((social) => social.token === asset.token);
    return social
      ? {
          ...asset,
          ...(social.twitter && { twitter: social.twitter }),
          ...(social.discord && { discord: social.discord }),
        }
      : asset;
  });

  return (
    <>
      <Head>
        <title>Check In</title>
      </Head>
      <div className="mx-auto flex max-w-screen-xl flex-wrap justify-evenly gap-6 pt-40 pb-12">
        {assetsWithSocials.map(({ imageUrl, name, token, discord, twitter }) => (
          <div className="h-68 relative flex w-40 flex-col items-center gap-1" key={token}>
            <a
              target="_blank"
              href={`https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/${token}`}
              rel="noreferrer"
            >
              <ExternalLinkIcon className="absolute top-0 right-0 z-10 m-1 h-5 w-5 cursor-pointer text-gray-400 transition-colors hover:text-gray-600" />
            </a>
            <div className="w-full overflow-hidden rounded-full">
              <Image src={imageUrl} width={600} height={600} layout="responsive" alt={name} />
            </div>
            <div className="mt-1 text-center text-sm">{name}</div>
            {twitter && (
              <a
                className="flex max-w-full items-center rounded-full bg-twitter px-2 py-1 transition betterhover:hover:scale-105"
                href={`https://twitter.com/${twitter}`}
                rel="noreferrer"
                target="_blank"
              >
                <TwitterIcon className="h-4 w-4" fill="#ffffff" />
                <p className="ml-1.5 overflow-hidden whitespace-nowrap font-default text-xs text-white">
                  @{twitter}
                </p>
              </a>
            )}
            {discord && (
              <span className="flex max-w-full items-center rounded-full bg-discord px-2 py-1">
                <DiscordIcon className="h-4 w-4" />
                <p className="ml-1.5 overflow-hidden whitespace-nowrap font-default text-xs text-white">
                  {discord}
                </p>
              </span>
            )}
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
