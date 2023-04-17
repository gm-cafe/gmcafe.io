import { Dialog } from '@headlessui/react';
import { UserIcon, XIcon } from '@heroicons/react/solid';
import { format, fromUnixTime } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { gmooContract, keekContract } from '../../lib/util/addresses';
import { Token } from '../../lib/util/types';
import { OpenSeaIcon } from '../Icons';
import { useEntryContext } from '../../lib/providers/EntryContext';

type Props = {
  metadata?: Token;
  onClose: () => void;
};

const Viewer = ({ metadata, onClose }: Props) => {
  const { type } = useEntryContext();

  if (!metadata) {
    return <Dialog open={false} onClose={() => null} />;
  }

  const { id, name, attributes, info } = metadata;

  const profileUrl = `/${type === 'gmoo' ? 'moo' : 'keek'}/${id}`;
  const osUrl = `https://opensea.io/assets/ethereum/${
    type === 'gmoo' ? gmooContract : keekContract
  }/${id}`;

  return (
    <Dialog open={!!metadata} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-[#A3A19AB2]" aria-hidden={true} />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="relative mx-auto grid grid-cols-1 gap-8 rounded-3xl bg-white p-8 md:grid-cols-5 md:gap-16 md:p-16">
            <button className="absolute right-3 top-3 focus:outline-none" onClick={onClose}>
              <XIcon className="h-5 w-5 text-[#A3A19A]" />
            </button>
            <div className="my-auto aspect-square md:col-span-2">
              <Image
                className="rounded-2xl"
                src={`https://gmcafe.s3.us-east-2.amazonaws.com/${type}/jpg/${id}.jpg`}
                width={600}
                height={600}
                alt={name}
                unoptimized
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4 md:col-span-3">
              <div className="flex">
                <h1 className="rounded-md bg-purple px-3 py-1 font-gmcafe text-3xl text-white md:text-4xl">
                  {info.title ?? name}
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {attributes.map((attribute) => (
                  <div className="flex" key={`${id}-${attribute.trait_type}`}>
                    <span className="text-gmcafe mr-2 text-purple md:text-xl">
                      {attribute.trait_type}:
                    </span>
                    <span className="font-gmcafe text-xl font-extrabold tracking-widest text-purple md:text-2xl">
                      {attribute.trait_type === 'Birth'
                        ? format(fromUnixTime(parseInt(attribute.value)), 'MMMM do, yyyy')
                        : attribute.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-1 flex items-center gap-4">
                <Link href={profileUrl}>
                  <UserIcon className="h-8 w-8 cursor-pointer rounded-full bg-purple p-1 text-white" />
                </Link>
                <a href={osUrl} target="_blank" rel="noreferrer">
                  <OpenSeaIcon className="h-8 w-8" fill="#2081E2" />
                </a>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default Viewer;
