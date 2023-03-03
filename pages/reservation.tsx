import { CheckIcon, XIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { constants, utils } from 'ethers';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import { useEnsAddress } from 'wagmi';
import { LoadingIcon } from '../components/Icons';
import { toastError } from '../lib/util/toast';

type State = 'typing' | 'confirmed' | 'unconfirmed';

const Reservation: NextPage = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState<State>('typing');
  const [loading, setLoading] = useState(false);

  const isValid = utils.isAddress(input) || input.endsWith('.eth');

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
        }
      })
      .catch(toastError)
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex min-h-screen bg-pink-background">
      <div className="mx-auto flex max-w-screen-sm flex-1 flex-col items-center justify-center gap-6">
        <div className="w-full">
          <span className="mx-2 font-gmcafe text-lg text-purple">Address/ENS name</span>
          <input
            className="w-full truncate rounded-lg border-2 border-transparent px-4 py-3 text-purple outline-none transition-colors focus:border-purple"
            value={input}
            onChange={onChange}
            placeholder={constants.AddressZero}
          />
          <p className="mx-2 mt-1.5 text-sm text-purple">
            {loading
              ? null
              : state === 'confirmed'
              ? "You're all set!"
              : state === 'unconfirmed'
              ? "You're not on the reservation list... check back later?"
              : null}
          </p>
        </div>
        <button
          className={classNames(
            'rounded-lg bg-white px-3 py-1 font-gmcafe text-xl text-purple transition-opacity',
            { 'cursor-not-allowed opacity-60': !isValid }
          )}
          onClick={onClick}
          disabled={state !== 'typing' || !isValid}
        >
          {loading ? (
            <LoadingIcon className="h-8 w-8 p-1 text-purple" />
          ) : state === 'typing' ? (
            'Check'
          ) : state === 'confirmed' ? (
            <CheckIcon className="h-8 w-8" />
          ) : (
            <XIcon className="h-8 w-8" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Reservation;

export const getServerSideProps = () => ({
  props: {
    title: 'Reservation',
  },
});
