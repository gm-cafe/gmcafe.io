import { useMemo } from 'react';
import { Choice, Options, Preference } from '../../lib/util/mint';
import CardStack from './CardStack';

type Props = {
  preferences: Preference;
  choose: (_idx: 0 | 1 | 2, _choice: Choice) => void;
  options: Options;
  advance: () => void;
};

const Preferences = ({ preferences, choose, options, advance }: Props) => {
  const current = useMemo(() => {
    const idx = preferences.findIndex((p) => p === undefined);
    return idx === 0 ? 0 : idx === 1 ? 1 : 2;
  }, [preferences]);

  const onRandom = () => {
    choose(current, 'random');
    current === 2 && advance();
  };

  return (
    <div className="w-full flex-grow">
      <div className="flex items-center gap-2 py-4 md:gap-8">
        <CardStack
          current={current}
          choose={choose}
          options={options.map((option) => option[0]) as [Choice, Choice, Choice]}
          advance={advance}
        />
        <span className="flex-grow text-center font-gmcafe text-2xl text-purple md:text-4xl">
          OR
        </span>
        <CardStack
          current={current}
          choose={choose}
          options={options.map((option) => option[1]) as [Choice, Choice, Choice]}
          advance={advance}
        />
      </div>
      <div className="mt-6 flex justify-center">
        <button
          className="rounded-full bg-purple px-4 py-1 font-gmcafe text-white shadow-lg-purple transition-transform hover:scale-105 md:text-xl"
          onClick={onRandom}
        >
          🎲 Feeling adventurous?
        </button>
      </div>
    </div>
  );
};

export default Preferences;
