/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import mooWrite from '../public/moo_write.png';
import tableCloth from '../public/table_cloth.png';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { ReactNode, useEffect, useState } from 'react';
import getAssetsFromAddress from '../lib/util/getAssetsFromAddress';
import { Asset } from '../lib/util/types';
import classNames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import Head from 'next/head';
import { XIcon } from '@heroicons/react/solid';
import { Discord } from '../components/StyledLinks';

const SIGN_MESSAGE = 'Check in to assist with Moo migration';

type CheckInProps = {
  addresses: string[];
  tokens: string[];
};

const CheckIn: NextPage<CheckInProps> = ({ addresses, tokens }: CheckInProps) => {
  const { isConnected, address } = useAccount();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [message, setMessage] = useState<ReactNode>();
  const [unrenderedMessage, setUnrenderedMessage] = useState<ReactNode>(
    <span>
      GMOO!
      <br />
      Please show us your
      <br />
      succulent hooves!
    </span>
  );
  const [isShowing, setIsShowing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const alreadyCheckedIn = address && addresses.includes(address);

  // Avoid the message from changing BEFORE the speech bubble disappears
  // Set it to a buffer unrenderedMessage state, then
  // the useEffect will rerender and run the timeoutFn to set what's actually being rendered
  const updateMessage = (newMessage: ReactNode) => {
    setIsShowing(false);
    setUnrenderedMessage(newMessage);
  };

  useEffect(() => {
    const timeoutFn = setTimeout(() => {
      setMessage(unrenderedMessage);
      setIsShowing(true);
    }, 350);

    return () => clearTimeout(timeoutFn);
  }, [unrenderedMessage, isShowing]);

  useEffect(() => {
    isConnected &&
      !alreadyCheckedIn &&
      updateMessage(
        <span>
          Welcome, fellow Moo!
          <br />
          Now you can check in.
        </span>
      );
    isConnected && alreadyCheckedIn && updateMessage(<span>You&apos;re already checked in!</span>);
  }, [isConnected, alreadyCheckedIn]);

  const library = useProvider();
  const { data: signer } = useSigner();

  useEffect(() => {
    getAssetsFromAddress(library, address).then(setAssets);
  }, [address, library]);

  const migrate = async () => {
    if (assets.length <= 0) {
      updateMessage("Looks like you don't have a Moo in this wallet...");
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

        updateMessage(responseMsg);
      })
      .catch((error) => updateMessage(error.message));
  };

  return (
    <>
      <Head>
        <title>Check In</title>
      </Head>
      <main className="h-screen overflow-hidden bg-pink-light">
        <section className="relative flex h-full flex-col items-center justify-end">
          <Transition
            show={isShowing}
            className="z-20 mx-auto h-72 w-72 shrink-0 translate-y-20 md:-right-52 md:top-1/3 md:h-[15rem] md:w-[18rem] md:translate-x-56 md:translate-y-32 lg:translate-x-72 lg:translate-y-48 2xl:h-[20rem] 2xl:w-[24rem] 2xl:translate-x-[23rem] 2xl:translate-y-56"
            enter="transition duration-200"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex h-full w-full items-center justify-center overflow-hidden break-words bg-speech-bubble-mobile bg-contain bg-center bg-no-repeat px-6 md:bg-speech-bubble">
              <p className="max-w-full pb-2 text-center font-gmcafe-skinny text-2xl font-semibold tracking-wide text-purple md:text-2xl 2xl:text-3xl">
                {message}
              </p>
            </div>
          </Transition>
          <div className="relative z-20 w-80 md:w-[28rem] 2xl:w-[36rem]">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="absolute top-0 left-10 z-30 hidden h-16 w-16 rounded-full border-6 border-purple bg-white font-gmcafe text-4xl text-purple shadow transition md:block 2xl:border-[7px] betterhover:hover:scale-105 betterhover:hover:shadow"
            >
              i
            </button>
            <div className="absolute top-10 z-20">
              <img src="sparkles.png" alt="sparkles" />
            </div>
            <div className="relative z-20 translate-y-22 md:translate-y-26 2xl:translate-y-28">
              <Image src={mooWrite} layout="responsive" alt="Moo with Pen" />
            </div>
            <div className="relative z-10 translate-y-14">
              <Image src={tableCloth} layout="responsive" alt="Table Cloth" />
            </div>
            <div className="ml-5 mr-4 flex h-[24vh] translate-y-2 flex-col items-center justify-start gap-2 rounded border-4 border-purple bg-white pt-12 md:ml-7 md:mr-6 md:h-[18vh] md:border-6 2xl:mr-8 2xl:ml-10 2xl:h-[30vh] 2xl:border-8">
              <CustomConnectButton className={classNames({ hidden: address })} />
              {address && (
                <button
                  className={classNames(
                    'rounded-lg bg-pink px-4 py-2 font-gmcafe-skinny text-xl font-semibold uppercase text-white shadow transition-transform hover:scale-105 sm:px-6 sm:py-3 sm:text-2xl',
                    { hidden: alreadyCheckedIn }
                  )}
                  type="button"
                  onClick={migrate}
                  disabled={!!alreadyCheckedIn}
                >
                  Check In
                </button>
              )}
              <button
                onClick={() => setIsDialogOpen(true)}
                className="rounded-lg bg-pink px-4 py-2 font-gmcafe-skinny text-xl font-semibold uppercase text-white shadow transition-transform hover:scale-105 sm:px-6 sm:py-3 sm:text-2xl md:hidden"
              >
                What is this?
              </button>
            </div>
          </div>
        </section>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Dialog.Panel className="relative mx-8 flex w-full max-w-xl transform flex-col gap-3 overflow-hidden rounded-2xl bg-white p-12 text-left align-middle text-purple shadow-xl transition-all">
              <XIcon
                className="absolute top-6 right-6 h-8 w-8 cursor-pointer"
                onClick={() => setIsDialogOpen(false)}
              />
              <Dialog.Title className="mb-4 font-gmcafe text-4xl uppercase">
                What is this?
              </Dialog.Title>
              <Dialog.Description>
                The Great Moogration is happening! Cows are finally being migrated to their own
                custom contract.
              </Dialog.Description>
              <p>
                Clicking <span className="font-semibold">Check In</span> will help us take
                attendance of all currently active Herd members in the space. This will help us
                determine how long to keep the migration time window open for.
              </p>
              <p>
                After the migration phase ends, anyone who does not successfully migrate by the
                deadline will have their cow(s) automatically minted to the Admin wallet. To claim
                your cow later, please open up a ticket in <Discord /> for next steps. Your cow will
                not be lost.
              </p>
              <p>
                The sooner we can complete the migration, the sooner we can delist the old
                collection on OpenSea to prevent any confusion.
              </p>
              <span className="self-end text-sm">Checked-in Moos: {tokens.length}</span>
            </Dialog.Panel>
          </div>
        </Dialog>
      </main>
    </>
  );
};

export default CheckIn;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}/api/checkin`);
  const { addresses, tokens } = await res.json();

  return {
    props: {
      addresses,
      tokens,
    },
  };
}

type CustomConnectButtonProps = {
  className?: string;
};

export const CustomConnectButton = ({ className }: CustomConnectButtonProps) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        return (
          <div className={classNames({ 'pointer-events-none select-none opacity-0': !mounted })}>
            {(() => {
              const buttonClasses =
                'rounded-lg bg-pink px-4 py-2 font-gmcafe-skinny text-xl font-semibold uppercase text-white shadow transition-transform hover:scale-105 sm:px-6 sm:py-3 sm:text-2xl';

              if (!mounted || !account || !chain) {
                return (
                  <button
                    className={classNames(buttonClasses, className)}
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
                    className={classNames(buttonClasses, className)}
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
