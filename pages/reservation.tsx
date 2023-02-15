import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import { LoadingIcon } from '../components/Icons';

type State = 'typing' | 'confirmed' | 'unconfirmed';

const Reservation: NextPage = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState<State>('typing');
  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setState('typing');
  };

  const onClick = () => {
    if (!input) {
      return;
    }

    setLoading(true);
    if (input === 'valid') {
      setState('confirmed');
    } else if (input === 'invalid') {
      setState('unconfirmed');
    }
    setTimeout(() => setLoading(false), 1000);
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
            placeholder="0x0000000000000000000000000000000000000000"
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
          className="rounded-lg bg-white px-3 py-1 font-gmcafe text-xl text-purple"
          onClick={onClick}
          disabled={state !== 'typing'}
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
