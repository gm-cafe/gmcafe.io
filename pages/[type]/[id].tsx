import Image from 'next/image';
import { format, fromUnixTime } from 'date-fns';
import classNames from 'classnames';
import { OpenSeaIcon } from '../../components/Icons';
import { gmooContract, keekContract } from '../../lib/util/addresses';
import { GetStaticPaths, GetStaticProps } from 'next';
import mootag from '../../public/profile/moo_tag.png';
import keektag from '../../public/profile/keek_tag.png';
import { Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import ENSName from '../../components/ENSName';
import { Token } from '../../lib/util/types';
import { CollectionType } from '../../lib/util/types';
import { useTokenURI } from '../../lib/hooks/useTokenURI';

const traitTypeStyle = 'font-gmcafe text-sm uppercase tracking-wider text-purple';
const traitValueStyle = 'text-sm text-purple';

type Props = {
  id: number;
  type: CollectionType;
};

const Tag = ({ id, type }: Props) => {
  const metadata = useTokenURI(type, id);

  if (!metadata) {
    return <div />;
  }

  const { image, name, attributes, info } = metadata;
  const bgColor = info.bg?.color;
  const fgColor = info.fg?.color;

  const customRenderTraits = ['Birth', 'Status'];
  const timestamp = attributes.find(({ trait_type }) => trait_type === 'Birth')?.value;
  const birthday = timestamp ? format(fromUnixTime(parseInt(timestamp)), 'MMMM do, yyyy') : '???';
  const status = attributes.find(({ trait_type }) => trait_type === 'Status')?.value;

  const displayName = info.title ?? name;

  const urlPrefix = type === 'gmoo' ? 'moo' : 'keek';
  const supply = type === 'gmoo' ? 333 : 3333;

  const isStart = id === 1;
  const isEnd = id === supply;

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
              'h-4 w-4 rounded-full'
            )}
          />
          <div
            style={{ backgroundColor: bgColor }}
            className={classNames(
              { 'border border-purple-light': bgColor === '#ffffff' },
              'h-4 w-4 rounded-full'
            )}
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
            <Link href={isStart ? `/${urlPrefix}/${supply}` : `/${urlPrefix}/${id - 1}`}>
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
                {type === 'gmoo' && <Image src={mootag} layout="responsive" alt="Moo Tag" />}
                {type === 'keek' && <Image src={keektag} layout="responsive" alt="Keek Tag" />}
              </div>
            </div>
            <div
              className={classNames(
                'mx-4 flex w-[22.125rem] flex-col gap-4 rounded-b-3xl bg-white px-6 pb-8 pt-6 md:w-[44rem] md:flex-row md:px-10 md:pt-0 lg:mx-auto',
                { 'moo-verified-herd': type === 'gmoo' },
                { 'moo-verified-keek': type === 'keek' }
              )}
            >
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
                  <h1 className="font-gmcafe text-4xl text-purple">
                    {displayName}
                    <span className={classNames('text-pink', { hidden: !info.titled })}>*</span>
                  </h1>
                  <a
                    className="ml-auto"
                    href={`https://opensea.io/assets/ethereum/${
                      type === 'gmoo' ? gmooContract : keekContract
                    }/${id}`}
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
                  <Link href={isStart ? `/${type}/${supply}` : `/${type}/${id - 1}`}>
                    <ChevronLeftIcon className="h-6 w-6 text-pink" />
                  </Link>
                </div>
                <div className="w-max cursor-pointer rounded-xl bg-white p-2">
                  <Link href={isEnd ? `/${type}/1` : `/${type}/${id + 1}`}>
                    <ChevronRightIcon className="h-6 w-6 text-pink" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 hidden md:block">
            <Link href={isEnd ? `/${type}/1` : `/${type}/${id + 1}`}>
              <ChevronRightIcon className="h-14 w-14 cursor-pointer text-pink" />
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Tag;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params?.id || '1';
  const tokenId = id ? (typeof id === 'string' ? parseInt(id) : parseInt(id[0])) : undefined;

  const type_ = ctx.params?.id || 'moo';
  const type = type_ === 'moo' ? 'gmoo' : 'keek';

  const token: Token = await fetch(
    `https://api.gmcafe.io/metadata/${type}/${String(tokenId).padStart(3, '0')}.json`
  ).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });

  return {
    props: {
      id: tokenId,
      type: type,
      title: token.name,
      metaImage: token.image,
      metaDescription: token.description,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const moos = Array.from(Array(333)).map((_, i) => ({
    params: {
      id: (i + 1).toString(),
      type: 'gmoo',
    },
  }));

  const keeks = Array.from(Array(3333)).map((_, i) => ({
    params: {
      id: (i + 1).toString(),
      type: 'keek',
    },
  }));

  return {
    paths: [...moos, ...keeks],
    fallback: false,
  };
};
