import classNames from 'classnames';
import Image from 'next/image';

type Props = {
  current: number;
  index: number;
  count: number;
  next: () => void;
};

const Card = ({ current, index, count, next }: Props) => {
  return (
    <div
      className={classNames(
        'absolute h-full w-full cursor-pointer rounded-xl border-4 border-white bg-white shadow-lg-purple transition-all duration-500 hover:border-purple',
        { 'opacity-0': current > index }
      )}
      style={{
        transform: `rotate(${current >= index ? 0 : index * 5}deg)`,
        zIndex: current > index ? 0 : count - index,
      }}
      onClick={next}
    >
      <Image src="/mint/animals.png" alt="Animals" layout="fill" />
    </div>
  );
};

export default Card;
