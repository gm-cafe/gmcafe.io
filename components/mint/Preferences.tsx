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
    </div>
  );
};

export default Preferences;
