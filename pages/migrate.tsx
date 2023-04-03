/* Vercel's Image Optimization doesn't work on animated PNGs */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Approve, Connect, Migrated, Migrate as MigrateMoos, NoMoo } from '../components/migration';
import { useAccount } from 'wagmi';
import useContractRead from '../lib/hooks/useContractRead';
import { Asset } from '../lib/util/types';
import AnchorLink from '../components/AnchorLink';
import { Default, Discord } from '../components/StyledLinks';
import { NextPageContext } from 'next';
import Countdown from '../components/Countdown';
import { metadata } from '../lib/constants';
import { BigNumber } from 'ethers';
import { gmooContract, gmooABI } from '../lib/util/addresses';
import Confetti from '../components/Confetti';

type State = 'connect' | 'approve' | 'migrate' | 'migrated';
export type LoadingState = 'approve' | 'migrate' | undefined;

const Migrate = () => {
  const [state, setState] = useState<State>('connect');
  const [isLoading, setIsLoading] = useState<LoadingState>();

  const { isConnected, address } = useAccount();
  const { data } = useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'getMigratableTokens',
    args: address,
    enabled: !!address,
  });

  const moos: BigNumber[] = [BigNumber.from(292)];
  const tokens: BigNumber[] = [BigNumber.from(0)];

  const assets = tokens
    ? tokens
        .map((token: BigNumber) =>
          metadata.find(
            (asset) =>
              asset.token ===
              '81086769033880357206596084476994515861067324006954129146728570574752278642689'
          )
        )
        .filter((asset): asset is Asset => !!asset)
    : [];
  const shareMooTokenId = moos[0] ? moos[0].toString() : undefined;

  useEffect(() => {
    isConnected && setState('approve');
  }, [isConnected]);

  // Reset state to approve when address has changed
  useEffect(() => {
    address && setState('approve');
  }, [address]);

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

  return (
    <div className="flex h-screen overflow-hidden bg-pink-background pt-28">
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
          <span className="mx-4 max-w-max rounded-full bg-pink px-6 font-gmcafe text-xl uppercase text-white">
            Your Herd
          </span>
        )}
        {assets.length <= 0 && (
          <div
            id="what-is-this"
            className="mx-4 flex flex-col items-center gap-3 overflow-y-auto rounded-lg bg-white p-6 text-purple shadow-lg-purple sm:p-8"
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
              located <Default href="https://opensea.io/collection/goodmorningcafe">here</Default>.
            </p>
            <p className="text-sm 2xl:text-base">
              <Countdown />
            </p>
          </div>
        )}
        {state === 'migrated' && (
          <div
            id="success"
            className="mx-4 flex flex-col items-center gap-3 overflow-y-auto rounded-lg bg-white p-6 text-purple shadow-lg-purple sm:p-8 2xl:gap-4"
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
            {assets.map(({ name, imageUrl, token }, idx) => (
              <div
                className={classNames(
                  { 'animate-pulse': state === 'migrate' && isLoading === 'migrate' },
                  'relative rounded-xl border-4 border-white bg-white bg-clip-border'
                )}
                key={token}
              >
                <div className="overflow-hidden rounded-lg">
                  <Image src={imageUrl} layout="responsive" alt={name} width={600} height={600} />
                </div>
                <span className="absolute top-0 right-0 rounded-bl-lg bg-white pl-2 pr-1 font-gmcafe text-lg text-purple 2xl:text-2xl">
                  {moos[idx].toString()}
                </span>
              </div>
            ))}
          </div>
        )}
        <div id="npc" className="relative z-20 mt-auto max-w-screen-sm">
          <div
            id="moo"
            className="absolute left-0 bottom-0 w-56 -translate-x-16 sm:w-56 sm:-translate-x-0"
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
          <div className="ml-14 h-min sm:mr-2 sm:mb-2 sm:ml-36">
            <span className="rounded-full bg-pink py-1.5 pl-22 pr-10 font-gmcafe text-xl tracking-wider text-white sm:pl-20">
              Harold
            </span>
            <div
              id="speech"
              className="-mt-2 box-border flex h-40 w-full flex-col rounded bg-white pt-6 pb-2 pl-[6.5rem] pr-4 text-sm text-purple shadow-lg-purple sm:h-28 sm:pb-4 sm:pr-4 sm:pl-20"
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
      {state === 'migrated' && <Confetti />}
    </div>
  );
};

export default Migrate;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const id = query['id'];
  const metaImage = id
    ? `https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/jpg-256/${id}.jpg`
    : 'https://gmcafe.io/meta_image.png';

  return {
    props: {
      title: 'Good Morning Café',
      metaImage,
      metaDescription:
        'The Great Moogration is happening! Our precious Highland Cows are finally being migrated to their own custom contract with much more luxurious pastures to graze in.',
    },
  };
};
