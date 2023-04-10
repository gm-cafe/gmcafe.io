import { useState } from 'react';
import Image from 'next/image';
import { useTokenURI } from '../../lib/util/contract/gmoo';
import { format, fromUnixTime } from 'date-fns';
import classNames from 'classnames';
import { OpenSeaIcon } from '../../components/Icons';
import { gmooContract } from '../../lib/util/addresses';
import { GetServerSideProps } from 'next';
import { Moo } from '../../lib/util/types';
import mootag from '../../public/profile/moo_tag.png';
import { Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import ENSName from '../../components/ENSName';

const traitTypeStyle = 'font-gmcafe text-sm uppercase tracking-wider text-purple';
const traitValueStyle = 'text-sm text-purple';
const defaultCopyTooltip = 'Click to copy';

type Props = {
  id: number;
};

const Moo = ({ id }: Props) => {
  const metadata = useTokenURI(id);
  const [copyText, setCopyText] = useState(defaultCopyTooltip);

  if (!metadata) {
    return <div />;
  }

  const { image, name, attributes } = metadata;
  const { bgColor, fgColor } = metadata.info;

  const customRenderTraits = ['Birth', 'Status'];
  const timestamp = attributes.find(({ trait_type }) => trait_type === 'Birth')?.value;
  const birthday = timestamp ? format(fromUnixTime(parseInt(timestamp)), 'MMMM do, yyyy') : '???';
  const status = attributes.find(({ trait_type }) => trait_type === 'Status')?.value;

  const isCustom =
    attributes.find(({ trait_type }) => trait_type === 'Delivery')?.value === 'Custom';
  const displayName = isCustom ? name.substring(name.indexOf(' - ') + 3) : name;

  const isStart = id === 1;
  const isEnd = id === 333;

  const onCopyHex = (color: string) => {
    setCopyText('Copied!');
    navigator.clipboard.writeText(color);
  };

  const separateAttributes = (
    <>
      <div className="md:col-span-2">
        <span className={traitTypeStyle}>ID</span>
        <p className={traitValueStyle}>{id}</p>
      </div>
      <div className="md:col-span-3">
        <span className={traitTypeStyle}>Birthday</span>
        <p className={traitValueStyle}>{birthday}</p>
      </div>
      <div className="md:col-span-2">
        <span className={traitTypeStyle}>Swatch</span>
        <div className="flex gap-1">
          <div
            style={{ backgroundColor: fgColor }}
            className={classNames(
              { 'border border-purple-light': fgColor === '#ffffff' },
              'h-4 w-4 cursor-pointer rounded-full'
            )}
            onClick={() => onCopyHex(fgColor)}
          />
          <div
            style={{ backgroundColor: bgColor }}
            className={classNames(
              { 'border border-purple-light': bgColor === '#ffffff' },
              'h-4 w-4 cursor-pointer rounded-full'
            )}
            onClick={() => onCopyHex(bgColor)}
          />
        </div>
      </div>
      <div className="md:col-span-3">
        <span className={traitTypeStyle}>Status</span>
        <p className={traitValueStyle}>{status}</p>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-pink-background pb-4 pt-32 md:pt-36">
      <Transition
        appear={true}
        show={true}
        enter="transition duration-700"
        enterFrom="opacity-0 -translate-y-8"
        enterTo="opacity-100 translate-y-0"
      >
        <div className="flex items-center">
          <div className="mt-20 hidden md:block">
            <Link href={isStart ? '/moo/333' : `/moo/${id - 1}`}>
              <ChevronLeftIcon className="h-14 w-14 cursor-pointer text-pink" />
            </Link>
          </div>
          <div>
            <div className="moo-tag-shadow relative pt-7 md:pt-12">
              <svg
                className="mx-auto -mb-[1px] w-[22.125rem] md:w-[44rem]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1133.62 186.12"
              >
                <path
                  className="fill-white"
                  d="M 0 186.13 c 0 -46.37 37.86 -72.87 83.96 -83.96 L 525.49 4.5 c 27.1 -6 55.19 -6 82.29 -0.01 l 441.89 97.68 c 47.05 11.09 83.96 37.59 83.96 83.96 H 0 z"
                />
              </svg>
              <div className="absolute left-1/2 top-0 w-52 -translate-x-7 md:w-80 md:-translate-x-10">
                <Image src={mootag} layout="responsive" alt="Moo Tag" />
              </div>
            </div>
            <div className="moo-verified-herd mx-4 flex w-[22.125rem] flex-col gap-4 rounded-b-3xl bg-white px-6 pb-8 pt-6 md:w-[44rem] md:flex-row md:px-10 md:pt-0 lg:mx-auto">
              <div className="flex flex-col gap-4">
                <div className="w-full md:w-64">
                  <Image
                    className="rounded-lg"
                    src={image}
                    width={800}
                    height={800}
                    layout="responsive"
                    alt={name}
                  />
                </div>
                <div className="hidden grid-cols-5 gap-x-2 gap-y-1 md:grid">
                  {separateAttributes}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h1 className="font-gmcafe text-4xl text-purple">{displayName}</h1>
                  <a
                    className="ml-auto"
                    href={`https://opensea.io/assets/ethereum/${gmooContract}/${id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <OpenSeaIcon className="h-6 w-6" fill="#2081E2" />
                  </a>
                </div>
                <ENSName
                  style={{ borderColor: bgColor }}
                  className="mb-2 border-b-4 pb-2 pt-1 text-xs text-purple"
                  address={metadata?.info?.owner}
                />
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 md:hidden">
                  {separateAttributes}
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {attributes
                    .filter(
                      ({ trait_type, value }) =>
                        !customRenderTraits.includes(trait_type) && value !== 'None'
                    )
                    .map(({ value, trait_type }) => (
                      <div key={`${trait_type}-${value}`}>
                        <span className={traitTypeStyle}>{trait_type}</span>
                        <p className={traitValueStyle}>{value}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="mx-4 md:hidden">
              <div className="mt-2 flex justify-center gap-2">
                <div className="w-max cursor-pointer rounded-xl bg-white p-2">
                  <Link href={isStart ? '/moo/333' : `/moo/${id - 1}`}>
                    <ChevronLeftIcon className="h-6 w-6 text-pink" />
                  </Link>
                </div>
                <div className="w-max cursor-pointer rounded-xl bg-white p-2">
                  <Link href={isEnd ? '/moo/1' : `/moo/${id + 1}`}>
                    <ChevronRightIcon className="h-6 w-6 text-pink" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 hidden md:block">
            <Link href={isEnd ? '/moo/1' : `/moo/${id + 1}`}>
              <ChevronRightIcon className="h-14 w-14 cursor-pointer text-pink" />
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Moo;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const tokenId = id ? (typeof id === 'string' ? parseInt(id) : parseInt(id[0])) : undefined;

  if (!tokenId || tokenId < 1) {
    return {
      redirect: {
        destination: '/moo/1',
        permanent: false,
      },
    };
  } else if (tokenId > 333) {
    return {
      redirect: {
        destination: '/moo/333',
        permanent: false,
      },
    };
  }

  const moo: Moo = await fetch(
    `https://api.gmcafe.io/metadata/gmoo/${String(tokenId).padStart(3, '0')}.json`
  ).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });

  return {
    props: {
      id: tokenId,
      title: moo.name,
      metaImage: moo.image,
      metaDescription: moo.description,
    },
  };
};
