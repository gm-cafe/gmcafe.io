import Card from './Card';

type Props = {
  current: number;
};

const CardStack = ({ current }: Props) => {
  return (
    <div className="relative h-40 w-40">
      <Card current={current} index={0} />
      <Card current={current} index={1} />
      <Card current={current} index={2} />
    </div>
  );
};

export default CardStack;
