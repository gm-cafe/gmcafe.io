import classNames from 'classnames';
import Image from 'next/image';
import { Choice, emoji } from '../../lib/util/mint';

type Props = {
  current: number;
  index: number;
  count: number;
  choose: () => void;
  option: Choice;
};

const Card = ({ current, index, count, choose, option }: Props) => {
  return (
    <div
      className={classNames(
        'absolute h-full w-full cursor-pointer rounded-xl bg-white shadow-lg-purple transition-all duration-200 hover:!scale-110',
        { 'opacity-0': current > index }
      )}
      style={{
        transform: `rotate(${
          current >= index ? 0 : Math.random() * count * 5 * (Math.random() > 0.5 ? -1 : 1)
        }deg)`,
        zIndex: current > index ? 0 : count - index,
      }}
      onClick={choose}
    >
      <Image src={`/mint/${option}.png`} alt={`Option ${option}`} layout="fill" />
      <span className="absolute bottom-1 right-1 text-xs md:bottom-3 md:right-3 md:text-base">
        {emoji[option]}
      </span>
    </div>
  );
};

export default Card;
