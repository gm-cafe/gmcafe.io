import Image from 'next/image';
import { HerdInfoByOwner } from '../../lib/util/types';

type Props = HerdInfoByOwner;

const Herd = ({ owner, herd }: Props) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4 md:flex-row md:flex-wrap md:items-center">
      <p className="shrink-0 truncate text-xs text-purple md:text-sm">{owner}</p>
      <div className="flex flex-wrap justify-evenly gap-2 md:ml-auto md:justify-end">
        {herd.map(({ moo }) => (
          <div className="h-12 w-12 md:h-20 md:w-20" key={`${owner}-${moo}`}>
            <Image
              className="rounded-full"
              src={`https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/jpg-256/${moo}.jpg`}
              alt={`Moo ${moo}`}
              layout="responsive"
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Herd;
