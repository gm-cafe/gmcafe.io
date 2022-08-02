import Image from 'next/image';
import { useTokenURI } from '../../lib/util/contract/gmoo';
import { format, fromUnixTime } from 'date-fns';
import classNames from 'classnames';
import { OpenSeaIcon } from '../../components/Icons';
import { gmooContract } from '../../lib/util/addresses';
import { GetServerSideProps } from 'next';
import { Moo } from '../../lib/util/types';
import { useEnsAvatar, useEnsName } from 'wagmi';

const traitTypeStyle = 'font-gmcafe text-sm uppercase tracking-wider text-purple';
const traitValueStyle = 'text-sm text-purple';

type Props = {
  id: number;
};

const Moo = ({ id }: Props) => {
  const metadata = useTokenURI(id);

  const { data: ensName } = useEnsName({
    address: metadata?.info?.owner,
    enabled: !!metadata?.info?.owner,
  });

  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: metadata?.info?.owner,
    enabled: !!metadata?.info?.owner,
  });

  if (!metadata) {
    return <div />;
  }

  const { image, name, attributes } = metadata;
  const { bgColor, fgColor, owner } = metadata.info;

  const customRenderTraits = ['Birth', 'Status'];
  const timestamp = attributes.find(({ trait_type }) => trait_type === 'Birth')?.value;
  const birthday = timestamp ? format(fromUnixTime(parseInt(timestamp)), 'MMMM Lo') : '???';
  const status = attributes.find(({ trait_type }) => trait_type === 'Status')?.value;

  const isCustom =
    attributes.find(({ trait_type }) => trait_type === 'Delivery')?.value === 'Custom';
  const displayName = isCustom ? name.substring(name.indexOf(' - ') + 3) : name;

  const separateAttributes = (
    <>
      <div>
        <span className={traitTypeStyle}>ID</span>
        <p className={traitValueStyle}>{id}</p>
      </div>
      <div>
        <span className={traitTypeStyle}>Birthday</span>
        <p className={traitValueStyle}>{birthday}</p>
      </div>
      <div>
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
      <div>
        <span className={traitTypeStyle}>Status</span>
        <p className={traitValueStyle}>{status}</p>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-background pt-36 pb-4 md:pt-40">
      <div className="mx-4 flex max-w-screen-lg flex-col gap-4 rounded-xl bg-white p-4 md:flex-row lg:mx-auto">
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
          <div className="hidden grid-cols-2 gap-x-2 gap-y-1 md:grid">{separateAttributes}</div>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <h1 className="font-gmcafe text-4xl text-purple">{displayName}</h1>
            <a
              className="ml-auto"
              href={`https://opensea.io/assets/ethereum/${gmooContract}/${id}`}
              target="_blank"
              rel="noreferrer"
            >
              <OpenSeaIcon className="h-8 w-8" fill="#2081E2" />
            </a>
          </div>
          <div
            style={{ borderColor: bgColor }}
            className="mb-2 flex items-center gap-1 border-b-4 pt-1 pb-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-4 w-4 rounded-full" src={ensAvatar || '/ens.png'} alt="ENS Avatar" />
            <p className="text-xs text-purple">{ensName || owner}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 md:hidden">{separateAttributes}</div>
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
    </div>
  );
};

export default Moo;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const tokenId = id ? (typeof id === 'string' ? parseInt(id) : parseInt(id[0])) : undefined;

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
