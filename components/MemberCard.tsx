import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

import ben from '../public/moos/ben.png';
import eeeba from '../public/moos/eeeba.png';
import jane from '../public/moos/jane.png';
import loop from '../public/moos/loop.png';
import raffy from '../public/moos/raffy.png';
import { TwitterIcon } from './Icons';

type MemberCardProps = {
  name: string;
  title: string;
  description: ReactNode | ReactNode[] | string;
  image: StaticImageData;
  twitter: string;
};

export const members: MemberCardProps[] = [
  {
    name: 'Ben Colefax • Highland #1',
    title: 'Creator',
    description: [
      'Ben has been drawing worlds of cute things for as long as he can remember. Dad of three. Always hungry. Three coffees a day kinda guy. Also on ',
      <a key="fnd" className="underline" target="blank" href="https://foundation.app/@bencolefax">
        FND
      </a>,
      ' & ',
      <a key="ig" className="underline" target="blank" href="https://instagram.com/bencolefax">
        IG
      </a>,
      '. Pretty Lit.',
    ],
    image: ben,
    twitter: 'https://twitter.com/bencolefax',
  },
  {
    name: 'Mum • Highland #238',
    title: 'Boss Wife',
    description:
      "Mother of the Herd - and of three real life tiny humans. Mum is also Ben's better half who's always working hard behind the scenes to keep the café serving the hottest coffees.",
    image: eeeba,
    twitter: 'https://twitter.com/gmcafenft',
  },
  {
    name: 'Jane • Highland #229',
    title: 'Cafe Manager & Dev',
    description:
      'Jane helps dad function on a daily basis and is a mega powerful front-end developer and artist. She is also the best daughter in the metaverse and serves a celebrity cat.',
    image: jane,
    twitter: 'https://twitter.com/catlady_jane',
  },
  {
    name: 'Loop • Highland #292',
    title: 'Barista & Dev',
    description:
      "It's rumoured that Master Loop hasn't left the café in months and sleeps in the loft where all the excess napkins and paper cups go. Loves rainbow cowffee. Very based.",
    image: loop,
    twitter: 'https://twitter.com/0xLoop_',
  },
  {
    name: 'Raffy • Highland #270',
    title: 'Barista & Dev',
    description:
      'Raffy enjoys the silky touch of supple spandex as he rides his bicycle through paddocks of code and mathematical equations to produce truly amazing feats. Also likes diamonds.',
    image: raffy,
    twitter: 'https://twitter.com/adraffy',
  },
];

const MemberCard = ({ name, title, description, image, twitter }: MemberCardProps) => {
  return (
    <div className="flex flex-col rounded-lg bg-white px-4 py-6 text-left shadow shadow-pink-light transition-transform betterhover:hover:scale-105">
      <div className="relative flex justify-center px-8 sm:px-0">
        <div className="z-10 w-full overflow-hidden rounded-full">
          <Image
            src={image}
            layout="responsive"
            onContextMenu={(e) => e.preventDefault()}
            alt={name}
          />
        </div>
        <a
          className="absolute right-0 bottom-0 z-10 sm:right-2 sm:bottom-2 2xl:right-0 2xl:bottom-0"
          href={twitter}
          target="_blank"
          rel="noreferrer"
        >
          <TwitterIcon className="mx-1 h-4 w-4 lg:h-5 lg:w-5 2xl:h-6 2xl:w-6" />
        </a>
      </div>
      <h1 className="mt-6 text-sm font-medium lg:text-base">{name}</h1>
      <h2 className="text-sm font-medium text-purple lg:text-base">{title}</h2>
      <p className="mt-2 text-sm 2xl:text-base">{description}</p>
    </div>
  );
};

export default MemberCard;
