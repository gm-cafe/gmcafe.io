import Image from 'next/image';

import { Token } from '../../lib/util/types';
import { useEntryContext } from '../../lib/providers/EntryContext';

type Props = {
  token: Token;
  setOpen: () => void;
};

const Card = ({ token, setOpen }: Props) => {
  const { id, name } = token;

  const { type } = useEntryContext();

  return (
    <div className="relative flex animate-section flex-col gap-3">
      <div className="cursor-pointer transition-transform hover:scale-105" onClick={setOpen}>
        <Image
          className="z-10 rounded-xl"
          src={`https://gmcafe.s3.us-east-2.amazonaws.com/${type}/jpg-256/${id}.jpg`}
          layout="responsive"
          width={300}
          height={300}
          alt={name}
          unoptimized
        />
      </div>
      <span className="absolute right-0 top-0 z-10 flex min-w-[28px] items-center justify-center rounded-bl-xl rounded-tr-xl bg-white px-2 font-gmcafe text-lg text-purple">
        {id}
      </span>
    </div>
  );
};

export default Card;
