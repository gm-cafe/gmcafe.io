import Image from 'next/image';

import { Token } from '../../lib/util/types';

type Props = {
  token: Token;
  setOpen: () => void;
};

const Card = ({ token, setOpen }: Props) => {
  const { id, name, image } = token;

  return (
    <div className="relative flex animate-section flex-col gap-3">
      <div className="cursor-pointer transition-transform hover:scale-105" onClick={setOpen}>
        <Image
          className="z-10 rounded-full"
          src={image}
          layout="responsive"
          width={300}
          height={300}
          alt={name}
        />
      </div>
      <span className="absolute top-0 right-0 z-10 flex min-w-[28px] items-center justify-center rounded-full bg-white px-2 font-gmcafe text-lg text-purple">
        {id}
      </span>
    </div>
  );
};

export default Card;
