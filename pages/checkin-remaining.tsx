import { ExternalLinkIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { DiscordIcon, TwitterIcon } from '../components/Icons';
import { metadata } from '../lib/constants';
import { Asset } from '../lib/util/types';

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

  console.log(assetsWithSocials);

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
              <ExternalLinkIcon className="absolute top-0 right-0 m-1 h-5 w-5 cursor-pointer text-gray-400 transition-colors hover:text-gray-600" />
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

type Socials = {
  token: string;
  discord?: string;
  twitter?: string;
};

type AssetsWithSocials = Asset & {
  discord?: string;
  twitter?: string;
};

const socials: Socials[] = [
  {
    token: '81086769033880357206596084476994515861067324006954129146728570249296836820993',
    twitter: 'VirusZeerow',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570253694883332097',
    twitter: 'AngelClarkSays',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570259192441470977',
    discord: 'katherine#5036',
    twitter: 'petrichorate',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570263590487982081',
    discord: 'wedpianda#3159',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570275685115887617',
    twitter: 'tron_quixote',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570281182674026497',
    discord: '0x113d#0113',
    twitter: '0x113d',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570300973883326465',
    discord: 'HEEEEEEEEEEE#4652',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570303172906582017',
    discord: 'Atlas Parker#6081',
    twitter: 'atlasprkr',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570309769976348673',
    discord: 'Elenia#8141',
    twitter: 'TheMamaNFT',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570316367046115329',
    discord: 'Atlas Parker#6081',
    twitter: 'atlasprkr',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570317466557743105',
    discord: 'ghosttyped#8573',
    twitter: 'ghosttyped',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570324063627509761',
    discord: 'ohjessica#1750',
    twitter: 'ohjphan',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570326262650765313',
    discord: 'koh#4105',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570328461674020865',
    discord: 'jh#1153',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570330660697276417',
    discord: '0x113d#0113',
    twitter: '0x113d',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570336158255415297',
    discord: 'aranair#0311',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570343854836809729',
    discord: 'Weldon#6916',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570353750441459713',
    discord: 'aimos#9343',
    twitter: 'iamaimos',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570357048976343041',
    discord: 'Tippy#1234',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570363646046109697',
    twitter: 'sapochat',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570376840185643009',
    discord: 'adrienney#7075',
    twitter: 'adriyoung',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570381238232154113',
    discord: 'callistally#2815',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570382337743781889',
    discord: 'JRYEN#8074',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570395531883315201',
    discord: 'xnoudi#0207',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570397730906570753',
    discord: 'Yukishiro#6482',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570401029441454081',
    discord: '0x113d#0113',
    twitter: '0x113d',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570404327976337409',
    twitter: 'hero_truck',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570408726022848513',
    discord: 'Bitcoinbella#3884',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570410925046104065',
    twitter: 'Zod1acHime',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570415323092615169',
    discord: 'mevcollector#1361',
    twitter: 'mevcollector',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570416422604242945',
    discord: 'Dinosaur#0220',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570427417720520705',
    discord: 'Locturnal#9897',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570428517232148481',
    discord: 'Carrie#9404',
    twitter: 'CarrieRodriguez',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570435114301915137',
    discord: 'KSR#7481',
    twitter: 'Crypto_Matters_',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570440611860054017',
    twitter: 'CryptoVonDoom',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570449407953076225',
    discord: 'Alsev110#3432',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570462602092609537',
    discord: 'Babyduck#4192',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570472497697259521',
    discord: 'Fei#1044',
    twitter: 'Feiderella',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570477995255398401',
    discord: 'CaesarsLaurel#5932',
    twitter: 'CaesarsLaurel',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570519776697253889',
    twitter: 'salimismail',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570520876208881665',
    discord: 'Krupper#0413',
    twitter: 'GloryofKrupp',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570524174743764993',
    discord: 'GWENI#3102',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570528572790276097',
    discord: 'voltriph#4693',
    twitter: 'voltriph',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570537368883298305',
    discord: 'RatMami#6219',
    twitter: '_ratpal_',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570556060580970497',
    discord: 'Genosis#7088',
    twitter: 'genosis2130',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570590145441431553',
    discord: 'oBlob#0009',
    twitter: 'oBlob_',
  },
  {
    token: '81086769033880357206596084476994515861067324006954129146728570594543487942657',
    discord: 'mina#8080',
    twitter: 'minasnft',
  },
];

export default CheckInRemaining;
