import { ArrowRightIcon, CheckIcon } from '@heroicons/react/solid';
import { KeekuInfo } from '../../lib/util/mint';

type Props = {
  advance: () => void;
  keeks: KeekuInfo[];
  setToken: (_token: number) => void;
};

const List = ({ advance, keeks, setToken }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 overflow-y-auto overflow-x-clip">
      <h1 className="font-gmcafe text-xl text-purple">Select a Keekusaur to influence:</h1>
      <div className="flex flex-col gap-6 overflow-y-auto px-8 md:py-4">
        {keeks.map(({ token, pref }) => {
          const disabled = pref !== 0 || token === 1 || token > 301;
          return (
            <button
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-gmcafe text-2xl text-purple transition-all hover:scale-105 hover:bg-purple hover:text-white disabled:opacity-50"
              key={token}
              disabled={disabled}
              onClick={() => {
                setToken(token);
                advance();
              }}
            >
              Keeku #{token}
              {!disabled && <ArrowRightIcon className="h-6 w-6" />}
              {disabled && <CheckIcon className="h-6 w-6" />}
            </button>
          );
        })}
      </div>
      <p className="rounded-lg px-2 py-1 text-center font-gmcafe text-sm text-purple md:text-base">
        Those with Custom cows (Moo No. 301-333) and 1/1 FND pieces will not be able to influence
        your Keekusaur, as your special Keekusaurs will be personally custom-made to match your
        cows.
      </p>
    </div>
  );
};

export default List;
