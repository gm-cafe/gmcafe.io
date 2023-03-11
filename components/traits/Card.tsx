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
      <span className="absolute top-0 right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white font-gmcafe text-lg text-purple 2xl:h-10 2xl:w-10 2xl:text-2xl">
        {id}
      </span>
    </div>
  );
};

export default Card;
