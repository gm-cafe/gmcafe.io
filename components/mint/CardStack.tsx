import { Choice } from '../../lib/util/mint';
import Card from './Card';

type Props = {
  current: number;
  choose: (_idx: 0 | 1 | 2, _choice: Choice) => void;
};

const CardStack = ({ current, choose }: Props) => {
  return (
    <div className="relative h-36 w-36 md:h-64 md:w-64">
      <Card current={current} index={0} count={3} choose={() => choose(0, 'fresh_food')} />
      <Card current={current} index={1} count={3} choose={() => choose(1, 'fresh_food')} />
      <Card current={current} index={2} count={3} choose={() => choose(2, 'fresh_food')} />
    </div>
  );
};

export default CardStack;
