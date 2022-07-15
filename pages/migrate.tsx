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
    <div className="flex min-h-screen bg-pink-background pt-28">
      <div
        className={classNames(
          { hidden: !isLoading },
          'fixed z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-40'
        )}
      >
        {isLoading === 'approve' && cupLoading}
        {isLoading === 'migrate' && portalLoading}
      </div>
      <div className="mx-auto mt-24 flex max-w-screen-sm flex-1 flex-col">
        <span
          className={classNames(
            { hidden: assets.length <= 0 },
            'max-w-max rounded-lg bg-purple px-4 font-gmcafe text-xl uppercase text-white'
          )}
        >
          Your Herd
        </span>
        <div className="mt-4 grid max-w-screen-sm grid-cols-2 gap-4">
          {assets.map(({ name, imageUrl, token }) => (
            <div
              className={classNames(
                { 'migration-drop-shadow': state === 'migrated' },
                'overflow-hidden rounded-lg border-4 border-purple'
              )}
              key={token}
            >
              <Image src={imageUrl} layout="responsive" alt={name} width={600} height={600} />
            </div>
          ))}
        </div>
        <div className="relative z-20 mt-auto max-w-screen-sm">
          <div className="absolute left-0 bottom-0 w-48 -translate-x-6 sm:w-56 sm:-translate-x-0">
            <Image
              src={state === 'connect' ? wave : state === 'migrated' ? heart : moo}
              layout="responsive"
              alt="Frankie"
            />
          </div>
          <div className="ml-28 mr-2 sm:mb-2 sm:ml-36">
            <span className="rounded-t-full border-x-4 border-purple bg-purple py-1 pl-16 pr-6 font-gmcafe tracking-wider text-white sm:pl-20">
              Harold
            </span>
            <div className="box-border flex h-28 w-full flex-col space-y-2 rounded border-4 border-purple bg-white py-3 pl-16 pr-4 text-sm text-purple sm:pl-20">
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
    </div>
  );
};

export default Migrate;
