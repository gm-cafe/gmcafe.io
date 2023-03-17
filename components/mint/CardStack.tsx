import { Choice } from '../../lib/util/mint';
import Card from './Card';

type Props = {
  current: number;
  choose: (_idx: 0 | 1 | 2, _choice: Choice) => void;
  options: [Choice, Choice, Choice];
};

const CardStack = ({ current, choose, options }: Props) => {
  return (
    <div className="relative h-36 w-36 md:h-64 md:w-64">
      <Card
        current={current}
        index={0}
        count={3}
        choose={() => choose(0, options[0])}
        option={options[0]}
      />
      <Card
        current={current}
        index={1}
        count={3}
        choose={() => choose(1, options[1])}
        option={options[1]}
      />
      <Card
        current={current}
        index={2}
        count={3}
        choose={() => choose(2, options[2])}
        option={options[2]}
      />
    </div>
  );
};

export default CardStack;
