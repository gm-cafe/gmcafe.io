import { DownloadIcon, XIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { constants, utils } from 'ethers';
import { GetServerSideProps, NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import { useEnsAddress } from 'wagmi';
import { LoadingIcon, TwitterIcon } from '../components/Icons';
import { toastError } from '../lib/util/toast';
import Image from 'next/image';

type State = 'typing' | 'confirmed' | 'unconfirmed';

const Reservation: NextPage = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState<State>('typing');
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState('');
  const [blob, setBlob] = useState('');

  const isValid = utils.isAddress(input) || input.endsWith('.eth');

  const imgUrl = `https://alpha.antistupid.com/render/card.jpg?${card}&size=800`;

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

    fetch(`https://alpha.antistupid.com/cafe/reservation?${data}`)
      .then((res) => res.json())
      .then((json) => {
        if (Object.keys(json).length === 0) {
          setState('unconfirmed');
        } else {
          setState('confirmed');
          setCard(json.card);
        }
      })
      .catch(toastError)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch(imgUrl)
      .then((response) => response.blob())
      .then((blob) => setBlob(URL.createObjectURL(blob)));
  }, [imgUrl]);

  return (
    <div className="flex min-h-screen bg-pink-background">
      <div className="mx-auto flex max-w-screen-sm flex-1 flex-col items-center justify-center gap-6 p-2">
        {state !== 'confirmed' && (
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
                ? "You're not on the reservation list... check back later?"
                : null}
            </p>
          </div>
        )}
        {card && (
          <div>
            <div className="rounded-[1.2rem] bg-white p-3 md:rounded-[2rem]">
              <Image width={1391} height={794} src={imgUrl} alt="Card" unoptimized />
            </div>
            <p className="mt-1 text-center font-gmcafe text-lg text-purple">
              Your reservation is confirmed. Come back on mint day to adopt your Keekusaur!
            </p>
            <div className="mt-3 flex justify-center gap-4">
              <a
                download="card.jpg"
                className="flex items-center gap-1 rounded-lg bg-purple py-2 pl-3 pr-4 transition-colors hover:bg-opacity-80"
                href={blob}
              >
                <DownloadIcon className="h-6 w-6 text-white" />
                <span className="font-gmcafe text-lg text-white">Download</span>
              </a>
              <a
                className="flex items-center gap-2 rounded-lg bg-purple py-2 px-4 transition-colors hover:bg-opacity-80"
                href={encodeURI(`https://twitter.com/intent/tweet?url=${imgUrl}`)}
              >
                <TwitterIcon className="h-6 w-6" fill="#ffffff" />
                <span className="font-gmcafe text-lg text-white">Share</span>
              </a>
            </div>
          </div>
        )}
        {state !== 'confirmed' && (
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
      </div>
    </div>
  );
};

export default Reservation;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { img } = ctx.query;
  const parsedImg = img ? (typeof img === 'string' ? img : img[0]) : undefined;

  return {
    props: {
      title: 'Reservation',
      metaDescription: 'Check if your wallet is allowlisted for Phase 2 Keekus!',
      metaImage: parsedImg ? encodeURI(parsedImg) : '/keeku_banner.png',
      twitterCard: 'summary_large_image',
    },
  };
};
