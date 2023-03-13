import Image from 'next/image';

type Props = {
  current: number;
  index: number;
};

const Card = ({ current, index }: Props) => {
  return (
    <div
      className="absolute h-full w-full rounded-xl bg-white shadow-lg-purple transition-transform"
      style={{ transform: `rotate(${current === index ? 0 : index * 4}deg)` }}
    >
      <Image src="/mint/animals.png" alt="Animals" layout="fill" />
    </div>
  );
};

export default Card;
