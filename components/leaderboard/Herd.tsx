import { ExternalLinkIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { HerdInfoByOwner } from '../../lib/util/types';

type Props = HerdInfoByOwner;

const Herd = ({ owner, herd }: Props) => {
  return (
    <div className="flex flex-col rounded-lg bg-white">
      <div className="flex items-center gap-2 rounded-t-lg bg-pink-light px-4 py-2">
        <p className="truncate text-xs text-purple md:text-sm">{owner}</p>
        <a className="ml-auto" href="https://etherscan.io">
          <ExternalLinkIcon className="h-6 w-6 text-purple" />
        </a>
      </div>
      <div className="flex flex-wrap gap-2 p-4">
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
