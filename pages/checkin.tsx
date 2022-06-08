import { NextPage } from 'next';
import mooWrite from '../public/moo_write.png';
import tableCloth from '../public/table_cloth.png';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { useEffect, useState } from 'react';
import getAssetsFromAddress from '../lib/util/getAssetsFromAddress';
import { Asset } from '../lib/util/types';
import classNames from 'classnames';
import { Transition } from '@headlessui/react';

const SIGN_MESSAGE = 'Check in to assist with Moo migration';

const CheckIn: NextPage = () => {
  const { data: account } = useAccount();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [message, setMessage] = useState<string>();

  const library = useProvider();
  const { data: signer } = useSigner();

  const address = account?.address;

  useEffect(() => {
    getAssetsFromAddress(library, address).then(setAssets);
  }, [address, library]);

  const migrate = async () => {
    if (assets.length <= 0) {
      setMessage("Looks like you're not a part of the herd");
      return;
    }

    await signer
      ?.signMessage(SIGN_MESSAGE)
      .then(async (hash) => {
        const response = await fetch('/api/verify', {
          method: 'POST',
          body: JSON.stringify({
            hash: hash,
            tokens: assets.map((asset) => asset.token),
            message: SIGN_MESSAGE,
          }),
        });

        const { message: responseMsg } = await response.json();

        setMessage(responseMsg);
      })
      .catch((error) => setMessage(error.message));
  };

  return (
    <main className="h-mobile overflow-hidden bg-pink-light">
      <section className="flex h-full items-end justify-center pt-20 2xl:pt-28">
        <div className="w-80 md:w-[28rem] 2xl:w-[36rem]">
          <Transition
            show={!!message}
            enter="transition-opacity"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex h-40 w-56 translate-y-22 translate-x-32 items-center justify-center overflow-hidden break-words bg-speech-bubble bg-contain bg-center bg-no-repeat px-6 md:h-44 md:w-64 md:translate-y-32 md:translate-x-60 2xl:w-72 2xl:translate-x-80">
              <p className="max-w-full font-gmcafe text-2xl font-semibold text-purple">
                {message?.toUpperCase()}
              </p>
            </div>
          </Transition>
          <div className="relative z-20 translate-y-22 md:translate-y-26 2xl:translate-y-28">
            <Image src={mooWrite} layout="responsive" alt="Moo with Pen" />
          </div>
          <div className="relative z-10 translate-y-14">
            <Image src={tableCloth} layout="responsive" alt="Table Cloth" />
          </div>
          <div className="ml-5 mr-4 flex h-[32vh] translate-y-2 items-start justify-center rounded border-4 border-purple bg-white pt-14 md:ml-7 md:mr-6 md:h-[18vh] md:border-6 2xl:mr-8 2xl:ml-10 2xl:h-[30vh] 2xl:border-8">
            <CustomConnectButton className={classNames({ hidden: account })} />
            {account && (
              <button
                className="rounded-lg bg-pink px-6 py-3 font-semibold text-white shadow transition-transform hover:scale-105"
                type="button"
                onClick={migrate}
              >
                Check In
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckIn;

type CustomConnectButtonProps = {
  className?: string;
};

export const CustomConnectButton = ({ className }: CustomConnectButtonProps) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button
                    className={classNames(
                      'rounded-lg bg-pink px-6 py-3 font-semibold text-white shadow transition-transform hover:scale-105',
                      className
                    )}
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className={classNames(
                      'rounded-lg bg-pink px-6 py-3 font-semibold text-white shadow transition-transform hover:scale-105',
                      className
                    )}
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return null;
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
