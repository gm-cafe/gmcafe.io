import { ExternalLinkIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { HerdInfoByOwner } from '../../lib/util/types';

type Props = HerdInfoByOwner;

const Herd = ({ owner, herd }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 rounded-t-lg bg-pink px-4 py-2">
        <p className="truncate text-xs text-white md:text-sm">{owner}</p>
        <a className="ml-auto" href="https://etherscan.io">
          <ExternalLinkIcon className="h-6 w-6 text-white" />
        </a>
      </div>
      <div className="flex flex-wrap gap-2 rounded-b-lg bg-pink-lighter p-4">
        {herd.map(({ moo }) => (
          <div className="relative h-12 w-12 md:h-[105px] md:w-[105px]" key={`${owner}-${moo}`}>
            <Image
              className="rounded-lg"
              src={`https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/jpg-256/${moo}.jpg`}
              alt={`Moo ${moo}`}
              layout="responsive"
              width={300}
              height={300}
            />
            <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg bg-white bg-opacity-40 font-gmcafe text-2xl text-purple opacity-0 transition-opacity hover:opacity-100">
              #{moo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Herd;
