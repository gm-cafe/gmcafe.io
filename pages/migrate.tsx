import Image from 'next/image';
import moo from '../public/migrate/moo.png';
import wave from '../public/migrate/wave.png';
import heart from '../public/migrate/heart.png';
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

type State = 'connect' | 'approve' | 'migrate' | 'migrated';
export type LoadingState = 'approve' | 'migrate' | undefined;

const Migrate = () => {
  const [state, setState] = useState<State>('connect');
  const [isLoading, setIsLoading] = useState<LoadingState>();

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

  return (
    <div className="flex h-screen overflow-hidden bg-pink-background pt-28">
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
        {assets.length > 0 && (
          <span className="mx-4 max-w-max rounded-lg bg-purple px-4 font-gmcafe text-xl uppercase text-white">
            Your Herd
          </span>
        )}
        <div className="my-4 mx-2 grid max-w-screen-sm grid-cols-2 gap-4 overflow-y-auto px-2">
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
        <div className="relative z-20 mt-auto max-w-screen-sm">
          <div className="absolute left-0 bottom-0 w-60 -translate-x-16 sm:w-56 sm:-translate-x-0">
            <Image
              src={state === 'connect' ? wave : state === 'migrated' ? heart : moo}
              layout="responsive"
              alt="Moo Waving"
            />
          </div>
          <div className="ml-28 h-min sm:mr-2 sm:mb-2 sm:ml-36">
            <span className="rounded-full bg-pink py-2 pl-16 pr-6 font-gmcafe text-lg tracking-wider text-white sm:pl-20">
              Harold
            </span>
            <div className="-mt-2 box-border flex h-36 w-full flex-col rounded bg-white pt-6 pb-2 pl-16 pr-2 text-sm text-purple shadow-xl sm:h-28 sm:pb-4 sm:pr-4 sm:pl-20">
              {state === 'connect' && <Connect />}
              {state === 'approve' && assets.length > 0 && (
                <Approve next={() => setState('migrated')} setLoading={setIsLoading} />
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
    </div>
  );
};

export default Migrate;
