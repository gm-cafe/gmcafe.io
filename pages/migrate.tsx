/* Vercel's Image Optimization doesn't work on animated PNGs */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import cup from '../public/migrate/cup.png';
import portal from '../public/migrate/portal.png';
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
import { BigNumber } from 'ethers';
import { metadata } from '../lib/constants';
import { Asset } from '../lib/util/types';
import AnchorLink from '../components/AnchorLink';
import Particles from 'react-tsparticles';
import { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { Default, Discord } from '../components/StyledLinks';
import { intervalToDuration, formatDuration } from 'date-fns';
import Head from 'next/head';
import { useRouter } from 'next/router';

type State = 'connect' | 'approve' | 'migrate' | 'migrated';
export type LoadingState = 'approve' | 'migrate' | undefined;

const endTimestamp = 1664510400000;

const Migrate = () => {
  const [state, setState] = useState<State>('connect');
  const [isLoading, setIsLoading] = useState<LoadingState>();
  const [time, setTime] = useState(Date.now());

  const { query } = useRouter();
  const id = query['id'];
  const ogImage = id
    ? `https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/jpg-256/${id}.jpg`
    : 'https://gmcafe.io/meta_image.png';

  const { isConnected, address } = useAccount();
  const { data: tokens } = useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'getMigratableTokens',
    args: address || fakeSeaContract,
  });

  const assets = tokens
    ? tokens
        .map((token: BigNumber) => metadata.find((asset) => asset.token === token.toString()))
        .filter((asset): asset is Asset => !!asset)
    : [];

  useEffect(() => {
    isConnected && setState('approve');
  }, [isConnected]);

  const cupLoading = (
    <div className="mb-48 flex max-w-max flex-col sm:mb-0">
      <p className="ml-6 text-center font-gmcafe text-purple">Approving...</p>
      <Image src={cup} width={96} height={96} alt="Loading Cup" />
    </div>
  );

  const portalLoading = (
    <div className="mb-48 flex max-w-max flex-col sm:mb-0">
      <Image src={portal} width={400} height={400} alt="Loading Cup" />
    </div>
  );

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const duration = intervalToDuration({
    start: time,
    end: endTimestamp,
  });
  const timeLeft = formatDuration(duration);

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
          'fixed z-10 flex h-full w-full items-center justify-center'
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
            <p className="text-sm sm:text-base">
              The Great Moogration is happening! Cows are finally being migrated to their own custom
              contract.
            </p>
            <p className="text-sm sm:text-base">
              To migrate your cow, you will need to complete 2 low-cost transactions.
            </p>
            <ol className="list-inside list-decimal text-sm sm:text-base">
              <li>Give approval to the contract to interact with your cow(s)</li>
              <li>
                Send your old cow(s) to the burn address, and mint brand new, shiny cow(s) to your
                connected wallet
              </li>
            </ol>
            <p className="text-sm sm:text-base">
              Although sending something to the burn address sounds scary, it really isn&apos;t!
              This step is required to make sure that 2 different versions of your cow don&apos;t
              exist at the same time. Remember, there is zero risk in losing your cow.
            </p>
            <p className="text-sm sm:text-base">
              After the migration phase ends, anyone who does not successfully migrate by the
              deadline will have their cow(s) automatically minted to the Admin wallet. To claim
              your cow later, please open up a ticket in <Discord /> for next steps. Don&apos;t
              worry--your precious cow(s) will be eagerly waiting for you.
            </p>
            <p className="text-sm sm:text-base">
              The sooner we can complete the migration, the sooner we can delist the old collection
              on OpenSea to prevent any confusion. Our new collection is located{' '}
              <Default href="https://opensea.io">here</Default>.
            </p>
            <p className="text-sm sm:text-base">Migration ends in {timeLeft}.</p>
          </div>
        )}
        {state === 'migrated' && (
          <div
            id="success"
            className="mx-4 flex flex-col items-center gap-3 overflow-y-auto rounded-lg bg-white p-6 text-purple shadow-lg sm:p-8 2xl:gap-4"
          >
            <h1 className="font-gmcafe text-4xl sm:text-5xl">Congratulations!</h1>
            <p className="text-sm sm:text-base">
              You&apos;ve successfully migrated your cow(s). We&apos;d appreciate if you could share
              on Twitter so we can spread the word to the rest of the herd!
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {assets.map(({ token, imageUrl, name }) => (
                <div className="w-20 overflow-hidden rounded-full" key={token}>
                  <Image src={imageUrl} alt={name} width={80} height={80} layout="responsive" />
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-4">
              <AnchorLink href={`https://opensea.io/${address}/goodmorningcafe`}>
                View on Opensea
              </AnchorLink>
              <AnchorLink href={`https://twitter.com`}>Tweet it</AnchorLink>
            </div>
          </div>
        )}
        <div
          id="moos"
          className="my-4 mx-2 grid max-w-screen-sm grid-cols-2 gap-4 overflow-y-auto px-2"
        >
          {assets.map(({ name, imageUrl, token }) => (
            <div
              className={classNames(
                { 'migration-drop-shadow': state === 'migrated' },
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
                <Approve next={() => setState('approve')} setLoading={setIsLoading} />
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
