/* Vercel's Image Optimization doesn't work on animated PNGs */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  Approve,
  Connect,
  Migrated,
  Migrate as MigrateMoos,
  gmooContract,
  gmooABI,
  fakeSeaContract,
  NoMoo,
} from '../components/migration';
import { useAccount, useContractRead } from 'wagmi';
import { Asset } from '../lib/util/types';
import AnchorLink from '../components/AnchorLink';
import Particles from 'react-tsparticles';
import { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { Default, Discord } from '../components/StyledLinks';
import Head from 'next/head';
import { NextPageContext } from 'next';
import Countdown from '../components/Countdown';
import { metadata } from '../lib/constants';
import { BigNumber } from 'ethers';

type State = 'connect' | 'approve' | 'migrate' | 'migrated';
export type LoadingState = 'approve' | 'migrate' | undefined;

type MigrateProps = {
  ogImage: string;
};

const Migrate = ({ ogImage }: MigrateProps) => {
  const [state, setState] = useState<State>('connect');
  const [isLoading, setIsLoading] = useState<LoadingState>();

  const { isConnected, address } = useAccount();
  const { data } = useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'getMigratableTokens',
    args: address || fakeSeaContract,
  });

  const moos: BigNumber[] = data?.moos || [];
  const tokens: BigNumber[] = data?.tokens || [];

  const assets = tokens
    ? tokens
        .map((token: BigNumber) => metadata.find((asset) => asset.token === token.toString()))
        .filter((asset): asset is Asset => !!asset)
    : [];
  const shareMooTokenId = moos[0] ? moos[0].toString() : undefined;

  useEffect(() => {
    isConnected && setState('approve');
  }, [isConnected]);

  const cupLoading = (
    <div className="mb-48 flex max-w-max flex-col sm:mb-0">
      <p className="ml-5 text-center font-gmcafe text-purple">Approving...</p>
      <img src="migrate/cup.png" width={96} height={96} alt="Loading Cup" />
    </div>
  );

  const portalLoading = (
    <div className="mb-48 flex max-w-max flex-col sm:mb-0">
      <img src="migrate/portal.png" width={300} alt="Loading Portal" />
    </div>
  );

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-pink-background pt-28">
      <Head>
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <div
        className={classNames(
          { hidden: !isLoading },
          { 'bg-white bg-opacity-40': isLoading === 'approve' },
          { 'z-10': isLoading === 'approve' },
          { 'z-30': isLoading === 'migrate' },
          'fixed flex h-full w-full items-center justify-center'
        )}
      >
        {isLoading === 'approve' && cupLoading}
        {isLoading === 'migrate' && portalLoading}
      </div>
      <div className="mx-auto flex max-w-screen-sm flex-1 flex-col sm:mt-12">
        {assets.length > 0 && state !== 'migrated' && (
          <span className="mx-4 max-w-max rounded-lg bg-purple px-4 font-gmcafe text-xl uppercase text-white">
            Your Herd
          </span>
        )}
        {assets.length <= 0 && (
          <div
            id="what-is-this"
            className="mx-4 flex flex-col items-center gap-3 overflow-y-auto rounded-lg bg-white p-6 text-purple shadow-lg sm:p-8"
          >
            <h1 className="font-gmcafe text-4xl sm:text-5xl">What is this?</h1>
            <p className="text-sm 2xl:text-base">
              The Great Moogration is happening! Our precious Highland Cows are finally being
              migrated to their own custom contract with much more luxurious pastures to graze in.
            </p>
            <p className="text-sm 2xl:text-base">
              Before going any further, please keep in mind that there is zero risk in migrating,
              you will not lose your Cow! Here&apos;s the steps...
            </p>
            <p className="text-sm 2xl:text-base">
              To effortlessly migrate, there will be two low-cost transactions:
            </p>
            <ol className="list-inside list-decimal text-sm 2xl:text-base">
              <li>Approve: allow the migration contract to interact with your cow(s)</li>
              <li>Migrate: exchange each cow in your wallet for a new cow</li>
            </ol>
            <p className="text-sm 2xl:text-base">
              Under the hood, the migration contract will confirm you are the owner of each cow,
              burn your old cow, and mint a new cow. Although burning sounds scary, this step is
              necessary to ensure that each cow can only be migrated once. After the migration
              transaction is complete, your cows are immediately available for use.
            </p>
            <p className="text-sm 2xl:text-base">
              After the moogration period ends, anyone who has not successfully migrated by the
              deadline will have their soft and supple Moo-Moo(s) automatically minted to the Admin
              wallet, where they will be eagerly waiting for you.
            </p>
            <p className="text-sm 2xl:text-base">
              To claim your Cow later, simply open up a support ticket in the <Discord /> for next
              steps. The sooner we can complete the migration, the sooner we can delist the old
              collection on OpenSea to prevent any confusion. The new home for the collection is
              located <Default href="https://opensea.io">here</Default>.
            </p>
            <p className="text-sm 2xl:text-base">
              Migration ends in <Countdown />.
            </p>
          </div>
        )}
        {state === 'migrated' && (
          <div
            id="success"
            className="mx-4 flex flex-col items-center gap-3 overflow-y-auto rounded-lg bg-white p-6 text-purple shadow-lg sm:p-8 2xl:gap-4"
          >
            <h1 className="font-gmcafe text-4xl sm:text-5xl">Congratulations!</h1>
            <p className="text-sm 2xl:text-base">
              You&apos;ve successfully migrated your tender floof to the fancy new{' '}
              <span className="font-semibold">GMOO</span> contract! Please help your fellow Herd by
              sharing on the Tweeters. <span className="font-semibold">#LETSMOO!</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {assets.map(({ token, imageUrl, name }) => (
                <div className="w-20 overflow-hidden rounded-full" key={token}>
                  <Image src={imageUrl} alt={name} width={80} height={80} layout="responsive" />
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <AnchorLink href={`https://opensea.io/${address}/goodmorningcafe`}>
                View on Opensea
              </AnchorLink>
              <AnchorLink
                href={`https://twitter.com/intent/tweet?text=%23GMOO%20The%20Herd%20is%20Moograting!%20%40gmcafeNFT%0A%0Ahttps%3A%2F%2Fgmcafe.io%2Fmigrate${
                  shareMooTokenId ? `%3Fid%3D${shareMooTokenId}` : ''
                }`}
              >
                Share on Twitter
              </AnchorLink>
            </div>
          </div>
        )}
        {state !== 'migrated' && (
          <div
            id="moos"
            className="my-4 mx-2 grid max-w-screen-sm grid-cols-2 gap-4 overflow-y-auto px-2"
          >
            {assets.map(({ name, imageUrl, token }) => (
              <div
                className={classNames(
                  { 'animation-pulse': state === 'migrate' },
                  'rounded-xl border-4 border-purple'
                )}
                key={token}
              >
                <div className="overflow-hidden rounded-lg">
                  <Image src={imageUrl} layout="responsive" alt={name} width={600} height={600} />
                </div>
              </div>
            ))}
          </div>
        )}
        <div id="npc" className="relative z-20 mt-auto max-w-screen-sm">
          <div
            id="moo"
            className="absolute left-0 bottom-0 w-52 -translate-x-12 sm:w-56 sm:-translate-x-0"
          >
            <img
              src={
                state === 'connect'
                  ? 'migrate/wave.png'
                  : state === 'migrated'
                  ? 'migrate/heart.png'
                  : 'migrate/moo.png'
              }
              alt="Moo Waving"
            />
          </div>
          <div className="ml-16 h-min sm:mr-2 sm:mb-2 sm:ml-36">
            <span className="rounded-full bg-pink py-1.5 pl-20 pr-10 font-gmcafe text-xl tracking-wider text-white sm:pl-20">
              Harold
            </span>
            <div
              id="speech"
              className="-mt-2 box-border flex h-36 w-full flex-col rounded bg-white pt-6 pb-2 pl-24 pr-4 text-sm text-purple shadow-xl sm:h-28 sm:pb-4 sm:pr-4 sm:pl-20"
            >
              {state === 'connect' && <Connect />}
              {state === 'approve' && assets.length > 0 && (
                <Approve next={() => setState('migrate')} setLoading={setIsLoading} />
              )}
              {state === 'approve' && assets.length <= 0 && <NoMoo />}
              {state === 'migrate' && (
                <MigrateMoos
                  next={() => setState('migrated')}
                  tokens={assets.map((asset) => asset.token)}
                  loading={isLoading}
                  setLoading={setIsLoading}
                />
              )}
              {state === 'migrated' && <Migrated />}
            </div>
          </div>
        </div>
      </div>
      {state === 'migrated' && (
        <Particles
          init={particlesInit}
          options={{
            emitters: [
              {
                position: {
                  x: 0,
                  y: 30,
                },
                rate: {
                  quantity: 5,
                  delay: 0.15,
                },
                particles: {
                  move: {
                    direction: 'top-right',
                    outModes: {
                      top: 'none',
                      left: 'none',
                      default: 'destroy',
                    },
                  },
                },
              },
              {
                position: {
                  x: 100,
                  y: 30,
                },
                rate: {
                  quantity: 5,
                  delay: 0.15,
                },
                particles: {
                  move: {
                    direction: 'top-left',
                    outModes: {
                      top: 'none',
                      right: 'none',
                      default: 'destroy',
                    },
                  },
                },
              },
            ],
            particles: {
              color: {
                value: ['#8946ab', '#ffffff', '#ff7dbd', '#ffb8d9'],
              },
              move: {
                decay: 0.05,
                direction: 'top',
                enable: true,
                gravity: {
                  enable: true,
                },
                outModes: {
                  top: 'none',
                  default: 'destroy',
                },
                speed: {
                  min: 10,
                  max: 50,
                },
              },
              number: {
                value: 0,
              },
              opacity: {
                value: 1,
              },
              rotate: {
                value: {
                  min: 0,
                  max: 360,
                },
                direction: 'random',
                animation: {
                  enable: true,
                  speed: 30,
                },
              },
              tilt: {
                direction: 'random',
                enable: true,
                value: {
                  min: 0,
                  max: 360,
                },
                animation: {
                  enable: true,
                  speed: 30,
                },
              },
              size: {
                value: {
                  min: 2,
                  max: 4,
                },
                animation: {
                  enable: true,
                  startValue: 'min',
                  count: 1,
                  speed: 16,
                  sync: true,
                },
              },
              roll: {
                enable: true,
                speed: {
                  min: 5,
                  max: 15,
                },
              },
              wobble: {
                distance: 30,
                enable: true,
                speed: {
                  min: -7,
                  max: 7,
                },
              },
              shape: {
                type: ['circle', 'square'],
                options: {},
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Migrate;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const id = query['id'];
  const ogImage = id
    ? `https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/jpg-256/${id}.jpg`
    : 'https://gmcafe.io/meta_image.png';

  return {
    props: {
      ogImage,
    },
  };
};
