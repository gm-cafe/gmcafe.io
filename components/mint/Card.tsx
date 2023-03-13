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
        'absolute h-full w-full cursor-pointer rounded-xl bg-white shadow-lg-purple transition-all duration-200 hover:!scale-110',
        { 'opacity-0': current > index }
      )}
      style={{
        transform: `rotate(${
          current >= index ? 0 : index * 5 * (Math.random() > 0.5 ? -1 : 1)
        }deg)`,
        zIndex: current > index ? 0 : count - index,
      }}
      onClick={next}
    >
      <Image src="/mint/animals.png" alt="Animals" layout="fill" />
    </div>
  );
};

export default Card;
