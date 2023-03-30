import { ArrowRightIcon, CheckIcon } from '@heroicons/react/solid';
import { KeekuInfo } from '../../lib/util/mint';

type Props = {
  advance: () => void;
  keeks: KeekuInfo[];
  setToken: (_token: number) => void;
};

const List = ({ advance, keeks, setToken }: Props) => {
  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto justify-center overflow-x-clip w-full items-center">
      {keeks.map(({ token, pref }) => (
        <button
          className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-gmcafe text-2xl text-purple transition-all hover:scale-105 hover:bg-purple hover:text-white disabled:opacity-50"
          key={token}
          disabled={pref != 0}
          onClick={() => {
            setToken(token);
            advance();
          }}
        >
          Keeku #{token}
          {pref === 0 && <ArrowRightIcon className="h-6 w-6" />}
          {pref !== 0 && <CheckIcon className="h-6 w-6" />}
        </button>
      ))}
    </div>
  );
};

export default List;
