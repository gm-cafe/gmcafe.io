import Image from 'next/image';

import { Moo } from '../../lib/util/types';

type Props = {
  moo: Moo;
  setOpen: () => void;
};

const Card = ({ moo, setOpen }: Props) => {
  const { id, name, image } = moo;

  return (
    <div className="relative flex flex-col gap-3">
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
      <span className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white font-gmcafe text-sm font-semibold text-purple 2xl:h-8 2xl:w-8 2xl:text-base">
        {id}
      </span>
    </div>
  );
};

export default Card;
