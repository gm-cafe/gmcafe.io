import { ExternalLinkIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { HerdInfoByOwner } from '../../lib/util/types';
import ENSName from '../ENSName';

type Props = HerdInfoByOwner;

const Herd = ({ owner, herd }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 rounded-t-lg bg-pink px-4 py-2">
        <a
          className="overflow-hidden"
          href={`https://etherscan.io/address/${owner}`}
          target="_blank"
          rel="noreferrer"
        >
          <ENSName className="truncate text-xs text-white md:text-sm" address={owner} />
        </a>
        <a
          className="ml-auto"
          href={`https://opensea.io/${owner}`}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLinkIcon className="h-6 w-6 text-white" />
        </a>
      </div>
      <div className="flex flex-wrap gap-4 rounded-b-lg bg-pink-lighter p-4">
        {herd.map(({ moo }) => (
          <Link href={`/moo/${moo}`} key={`${owner}-${moo}`}>
            <a className="relative h-[61px] w-[61px] transition hover:scale-105 md:h-[98px] md:w-[98px]">
              <Image
                className="rounded-lg"
                src={`https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/jpg-256/${moo}.jpg`}
                alt={`Moo ${moo}`}
                layout="responsive"
                width={128}
                height={128}
              />
              <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg bg-white bg-opacity-40 font-gmcafe text-lg text-purple opacity-0 transition-opacity hover:opacity-100 md:text-2xl">
                #{moo}
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Herd;
