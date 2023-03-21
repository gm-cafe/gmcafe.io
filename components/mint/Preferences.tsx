import { useMemo, useState } from 'react';
import { Choice, Options, Preference } from '../../lib/util/mint';
import CardStack from './CardStack';

type Props = {
  preferences: Preference[];
  choose: (_mint: number, _idx: 0 | 1 | 2, _choice: Choice) => void;
  options: Options[];
  advance: () => void;
};

const Preferences = ({ preferences, choose, options, advance: _advance }: Props) => {
  const [idx, setIdx] = useState(0);

  const option = options[idx];

  const advance = () => (idx + 1 >= preferences.length ? _advance() : setIdx(idx + 1));

  const current = useMemo(() => {
    const prefIdx = preferences[idx].findIndex((p) => p === undefined);
    return prefIdx === 0 ? 0 : prefIdx === 1 ? 1 : 2;
  }, [preferences, idx]);

  return (
    <div className="w-full flex-grow">
      <div className="flex items-center gap-2 py-4 md:gap-8">
        <CardStack
          current={current}
          choose={choose}
          options={option.map((option) => option[0]) as [Choice, Choice, Choice]}
          advance={advance}
          mint={idx}
        />
        <span className="flex-grow text-center font-gmcafe text-2xl text-purple md:text-4xl">
          OR
        </span>
        <CardStack
          current={current}
          choose={choose}
          options={option.map((option) => option[1]) as [Choice, Choice, Choice]}
          advance={advance}
          mint={idx}
        />
      </div>
    </div>
  );
};

export default Preferences;
