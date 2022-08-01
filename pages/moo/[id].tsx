import Image from 'next/image';
import { useTokenURI } from '../../lib/util/contract/gmoo';
import { format, fromUnixTime } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import classNames from 'classnames';
import { OpenSeaIcon } from '../../components/Icons';
import { gmooContract } from '../../lib/util/addresses';
import { NextSeo } from 'next-seo';

const traitTypeStyle = 'font-gmcafe text-sm uppercase tracking-wider text-purple';
const traitValueStyle = 'text-sm text-purple';

const Moo = ({ id, image256 }: { id?: number; image256?: string }) => {
  const metadata = useTokenURI(id);

  if (!metadata) {
    return <div />;
  }

  const { image, name, attributes, description } = metadata;
  const { bgColor, fgColor, owner } = metadata.info;

  const customRenderTraits = ['Birth', 'Status'];
  const timestamp = attributes.find(({ trait_type }) => trait_type === 'Birth')?.value;
  const birthday = timestamp ? format(fromUnixTime(parseInt(timestamp)), 'MMMM Lo') : '???';
  const status = attributes.find(({ trait_type }) => trait_type === 'Status')?.value;

  return (
    <>
      <NextSeo
        title={name}
        description={description}
        openGraph={{
          images: [
            {
              url: image256 || 'https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/jpg-256/unknown.jpg',
            },
          ],
        }}
      />
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
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
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
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <h1 className="font-gmcafe text-4xl text-purple">{name}</h1>
              <a
                href={`https://opensea.io/assets/ethereum/${gmooContract}/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                <OpenSeaIcon className="h-8 w-8" fill="#2081E2" />
              </a>
            </div>
            <p
              style={{ borderColor: bgColor }}
              className="border-b-4 pt-1 pb-2 text-xs text-purple"
            >
              {owner}
            </p>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-2">
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
    </>
  );
};

export default Moo;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Array.from({ length: 333 }, (_, idx) => ({
    params: {
      id: (idx + 1).toString(),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const tokenId = id ? (typeof id === 'string' ? parseInt(id) : parseInt(id[0])) : undefined;
  const image256 = `https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/jpg-256/${tokenId}.jpg`;

  return {
    props: {
      id: tokenId,
      image256: image256,
    },
  };
};
