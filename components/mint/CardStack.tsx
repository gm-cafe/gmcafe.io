import Card from './Card';

type Props = {
  current: number;
  next: () => void;
};

const CardStack = ({ current, next }: Props) => {
  return (
    <div className="relative h-80 w-80">
      <Card current={current} index={0} count={3} next={next} />
      <Card current={current} index={1} count={3} next={next} />
      <Card current={current} index={2} count={3} next={next} />
    </div>
  );
};

export default CardStack;
