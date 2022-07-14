import Image from 'next/image';
import moo from '../public/migrate/moo.png';
import cup from '../public/migrate/cup.png';
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
} from '../components/migration';
import { useAccount, useContractRead } from 'wagmi';
import { BigNumber } from 'ethers';
import { metadata } from '../lib/constants';
import { Asset } from '../lib/util/types';

type State = 'connect' | 'approve' | 'migrate' | 'migrating' | 'migrated';

const Migrate = () => {
  const [state, setState] = useState<State>('connect');
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="flex min-h-screen bg-pink-light pt-28">
      <div
        className={classNames(
          { hidden: !isLoading },
          'fixed z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-40'
        )}
      >
        <div className="flex max-w-max flex-col">
          <p className="ml-5 text-center font-gmcafe text-purple">Loading...</p>
          <Image src={cup} width={96} height={96} alt="Loading Cup" />
        </div>
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
        <div className="relative mx-auto mt-auto max-w-screen-sm">
          <div className="absolute left-0 bottom-0 w-52">
            <Image src={moo} layout="responsive" alt="Frankie" />
          </div>
          <div className="ml-36 mr-2 mb-2">
            <span className="rounded border-x-4 border-purple bg-purple py-0.5 pl-16 pr-4 font-gmcafe text-sm text-white">
              Frankie
            </span>
            <div className="box-border flex w-full max-w-max flex-col rounded border-4 border-purple bg-white py-2 pl-16 pr-4 text-sm text-purple">
              {state === 'connect' && <Connect />}
              {state === 'approve' && (
                <Approve next={() => setState('migrate')} setLoading={setIsLoading} />
              )}
              {state === 'migrate' && (
                <MigrateMoos
                  next={() => setState('migrated')}
                  tokens={assets.map((asset) => asset.token)}
                  setLoading={setIsLoading}
                />
              )}
              {/* {state === 'migrating' && <Migrating next={() => setState('migrated')} />} */}
              {state === 'migrated' && <Migrated />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Migrate;
