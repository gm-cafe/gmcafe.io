import { DownloadIcon, XIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { constants, utils } from 'ethers';
import { GetServerSideProps, NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import { useEnsAddress } from 'wagmi';
import { LoadingIcon, TwitterIcon } from '../components/Icons';
import { toastError } from '../lib/util/toast';
import Image from 'next/image';
import { Discord } from '../components/StyledLinks';
import Confetti from '../components/Confetti';

type State = 'typing' | 'confirmed' | 'unconfirmed' | 'not in discord';

const Reservation: NextPage = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState<State>('typing');
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState('');
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [cacheCardLoading, setCacheCardLoading] = useState(false);
  const [moos, setMoos] = useState(0);
  const [mints, setMints] = useState(0);
  const [fnds, setFnds] = useState(0);

  const airdropCount = moos + fnds;

  const isValid = utils.isAddress(input) || input.endsWith('.eth');

  const imgUrl = `https://api.gmcafe.io/render/card.jpg?${card}&size=800`;

  const { data } = useEnsAddress({
    name: input,
    enabled: isValid,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setState('typing');
  };

  const onClick = () => {
    if (!data) {
      return;
    }

    setLoading(true);

    fetch(`https://api.gmcafe.io/cafe/reservation?${data}`)
      .then((res) => res.json())
      .then((json) => {
        if (Object.keys(json).length === 0) {
          setState('unconfirmed');
        } else {
          setState(json.not_in_discord ? 'not in discord' : 'confirmed');
          json.card && setCard(json.card);
          json.moos && setMoos(json.moos.length);
          json.mints && setMints(json.mints);
          json.fnds && setFnds(json.fnds.length);
        }
      })
      .catch(toastError)
      .finally(() => setLoading(false));
  };

  const onDownload = async () => {
    setDownloadLoading(true);

    const cacheCard: string | undefined = card
      ? await fetch(`https://api.gmcafe.io/render/save-card?${card}`)
          .then((response) => response.json())
          .then((json) => json.url)
          .catch(toastError)
      : undefined;

    if (!cacheCard) {
      return;
    }

    const cacheImage: string | void = cacheCard
      ? await fetch(cacheCard)
          .then((response) => response.blob())
          .then((blob) => URL.createObjectURL(blob))
          .catch(toastError)
      : undefined;

    if (!cacheImage) {
      return;
    }

    const a = document.createElement('a');
    a.href = cacheImage;
    a.download = 'card.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloadLoading(false);
  };

  const onTwitterShare = async () => {
    setCacheCardLoading(true);

    const hash: string | undefined = card
      ? await fetch(`https://api.gmcafe.io/render/save-card?${card}`)
          .then((response) => response.json())
          .then((json) => json.hash)
          .catch(toastError)
      : undefined;

    const twitterIntent = `https://twitter.com/intent/tweet?url=https://gmcafe.io/reservation${
      hash ? `?img=${hash}` : undefined
    }`;

    window.open(twitterIntent, '_blank')?.focus();

    setCacheCardLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-pink-background pt-40">
      <div className="mx-auto flex max-w-screen-sm flex-1 flex-col items-center justify-center gap-6 p-2">
        {!['confirmed', 'not in discord'].includes(state) && (
          <div className="w-full">
            <span className="mx-2 font-gmcafe text-lg text-purple">Address/ENS name</span>
            <input
              className="w-full truncate rounded-lg border-2 border-transparent px-4 py-3 text-purple outline-none transition-colors focus:border-purple"
              value={input}
              onChange={onChange}
              placeholder={constants.AddressZero}
              onKeyPress={(e) => isValid && e.key === 'Enter' && onClick()}
            />
            <p className="mx-2 mt-1.5 text-sm text-purple">
              {loading
                ? null
                : state === 'unconfirmed'
                ? 'Sorry, you do not have a Reservation and are not on the Patron Waitlist! Come back during our Public phase to mint your Keek.'
                : null}
            </p>
          </div>
        )}
        {card && (
          <div className="rounded-[1.2rem] bg-white p-3 md:rounded-[2rem]">
            <Image width={1391} height={794} src={imgUrl} alt="Card" unoptimized />
          </div>
        )}
        {state === 'confirmed' && card && (
          <p className="mt-1 text-center font-gmcafe text-lg text-purple">
            {mints > 0
              ? 'Your reservation is confirmed.'
              : "You're registered on the Patron Waitlist."}{' '}
            Come back on mint day to adopt your Keekusaur!
            {mints > 1 && (
              <span>
                {' '}
                You will be able to mint{' '}
                <span className="rounded-lg bg-white px-1.5 text-2xl">{mints}</span> Keekusaurs on
                mint day!
              </span>
            )}
          </p>
        )}
        {airdropCount > 0 && (
          <p className="text-center font-gmcafe text-lg text-purple">
            Congrats you{card ? ' also' : ''} have a{' '}
            {moos > 0 && fnds > 0
              ? 'Moo and Foundation Piece'
              : fnds > 0
              ? 'Foundation Piece'
              : 'Moo'}
            !{' '}
            <span className={classNames({ 'rounded-lg bg-white px-1.5 text-2xl': moos > 1 })}>
              {moos === 1 ? 'A' : moos}
            </span>{' '}
            Keekusaur
            {moos === 1 ? '' : 's'} will be airdropped to your wallet
          </p>
        )}
        {state === 'not in discord' && (
          <p className="text-center font-gmcafe text-lg text-purple">
            You must be in our <Discord /> to keep your reservation.
          </p>
        )}
        {card && (
          <div className="flex justify-center gap-4">
            <button
              className="flex items-center gap-1 rounded-lg bg-purple py-2 pl-3 pr-4 transition-colors hover:bg-opacity-80"
              onClick={onDownload}
            >
              {!downloadLoading && (
                <>
                  <DownloadIcon className="h-6 w-6 text-white" />
                  <span className="font-gmcafe text-lg text-white">Download</span>
                </>
              )}
              {downloadLoading && <LoadingIcon />}
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-purple py-2 px-4 transition-colors hover:bg-opacity-80"
              onClick={onTwitterShare}
            >
              {!cacheCardLoading && (
                <>
                  <TwitterIcon className="h-6 w-6" fill="#ffffff" />
                  <span className="font-gmcafe text-lg text-white">Share</span>
                </>
              )}
              {cacheCardLoading && <LoadingIcon />}
            </button>
          </div>
        )}
        {!['confirmed', 'not in discord'].includes(state) && (
          <button
            className={classNames(
              'rounded-lg bg-white px-3 py-1 font-gmcafe text-xl text-purple transition-opacity',
              { 'cursor-not-allowed opacity-60': !isValid }
            )}
            onClick={onClick}
            disabled={state !== 'typing' || !data}
          >
            {loading ? (
              <LoadingIcon className="h-8 w-8 p-1 text-purple" />
            ) : state === 'typing' ? (
              'Check'
            ) : (
              <XIcon className="h-8 w-8" />
            )}
          </button>
        )}
        <div className="rounded-lg bg-white p-3">
          <Image src="/mint/mint_time.png" width={500} height={500} alt="Mint Time" />
        </div>
      </div>
      {state === 'confirmed' && <Confetti />}
    </div>
  );
};

export default Reservation;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { img } = ctx.query;
  const hash = img ? (typeof img === 'string' ? img : img[0]) : undefined;

  return {
    props: {
      title: 'Reservation',
      metaDescription: 'Check if your wallet is confirmed for the Keekusaurs mint!',
      metaImage: hash ? `https://api.gmcafe.io/card-cache/${hash}.png` : '/keeku_banner.png',
      twitterCard: 'summary_large_image',
    },
  };
};
