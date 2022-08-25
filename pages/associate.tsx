import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { LoadingIcon } from '../components/Icons';
import { Discord } from '../components/StyledLinks';

const Associate: NextPage = () => {
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  const { address } = useAccount();

  const { query } = useRouter();
  const { nonce } = query;

  const { signMessage } = useSignMessage({
    message: `GMOO!\nOwner: ${address}\nNonce: ${nonce}`,
    onMutate: () => setApiLoading(true),
    onSettled: () => setApiLoading(false),
    onSuccess: (data) => {
      const body = {
        owner: address,
        sig: data,
      };
      fetch('https://api.gmcafe.io/bot-api/associate', {
        method: 'POST',
        body: JSON.stringify(body),
      })
        .then(() => setApiSuccess(true))
        .catch(console.error);
    },
  });

  const nonceNotFound = (
    <div className="m-4 flex max-w-screen-sm flex-col gap-2 rounded-xl bg-white p-4 md:mx-auto">
      <h1 className="font-gmcafe text-4xl text-purple">Invalid Discord URL</h1>
      <p className="text-sm text-purple">
        Please try again using the link generated from the /associate Discord command, or open a
        Support ticket in the <Discord /> Server.
      </p>
    </div>
  );

  const associateButton = (
    <button
      className={classNames(
        'relative rounded-2xl bg-pink px-4 py-2 font-gmcafe text-2xl text-white',
        { 'transition-transform hover:scale-105': !apiLoading }
      )}
      onClick={() => signMessage()}
      disabled={apiLoading}
    >
      <span className={classNames('uppercase', { 'opacity-0': apiLoading })}>Associate</span>
      <span className="absolute top-0 right-0 flex h-full w-full items-center justify-center">
        {apiLoading && <LoadingIcon />}
      </span>
    </button>
  );

  const successMessage = (
    <div className="m-4 flex max-w-screen-sm flex-col gap-2 rounded-xl bg-white p-4 md:mx-auto">
      <h1 className="font-gmcafe text-4xl text-purple">Success!</h1>
      <p className="text-sm text-purple">
        Your wallet is successfully associated with your Discord username and you can now close this
        window.
      </p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-pink-background">
      <Head>
        <title>Associate</title>
        <meta
          name="description"
          content="Associate your wallet with your Discord username using the M007 bot."
          key="desc"
        />
      </Head>
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        {!nonce && nonceNotFound}
        {!apiSuccess && nonce && <ConnectButton />}
        {!apiSuccess && nonce && address && associateButton}
        {apiSuccess && successMessage}
      </div>
    </div>
  );
};

export default Associate;
