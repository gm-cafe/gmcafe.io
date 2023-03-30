import { Choice, Options, Preference } from '../../lib/util/mint';
import { LoadingIcon } from '../Icons';
import CardStack from '../mint/CardStack';

type Props = {
  advance: () => void;
  options?: Options;
  choose: (_idx: 0 | 1 | 2, _choice: Choice) => void;
  preference: Preference;
};

const Choose = ({ advance, options, choose, preference }: Props) => {
  return !options ? (
    <LoadingIcon className="h-12 w-12 text-purple" />
  ) : (
    <div className="flex w-full items-center gap-2 py-4 md:gap-8">
      <CardStack
        current={preference.findIndex((p) => !p)}
        choose={(_, idx, choice) => choose(idx, choice)}
        options={options.map((option) => option[0]) as [Choice, Choice, Choice]}
        advance={advance}
        mint={0}
      />
      <span className="flex-grow text-center font-gmcafe text-2xl text-purple md:text-4xl">OR</span>
      <CardStack
        current={preference.findIndex((p) => !p)}
        choose={(_, idx, choice) => choose(idx, choice)}
        options={options.map((option) => option[1]) as [Choice, Choice, Choice]}
        advance={advance}
        mint={0}
      />
    </div>
  );
};

export default Choose;
