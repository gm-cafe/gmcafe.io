import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTokenURI } from '../../lib/util/contract/gmoo';
import { format, fromUnixTime } from 'date-fns';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

const Moo = () => {
  const router = useRouter();
  const { id } = router.query;

  const tokenId = id ? (typeof id === 'string' ? parseInt(id) : parseInt(id[0])) : undefined;

  const metadata = useTokenURI(tokenId);

  if (!metadata) {
    return <div />;
  }

  const { image, name, attributes, description } = metadata;
  const { bgColor, owner } = metadata.info;

  const customRenderTraits = ['Birth', 'Status'];
  const timestamp = attributes.find(({ trait_type }) => trait_type === 'Birth')?.value;
  const birthday = timestamp ? format(fromUnixTime(parseInt(timestamp)), 'MMMM Lo') : '???';
  const status = attributes.find(({ trait_type }) => trait_type === 'Status')?.value;

  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-background pt-40">
      <Head>
        <title>{name}</title>
        <meta property="og:image" content={image} />
        <meta name="twitter:image" content={image} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
      </Head>
      <div className="mx-auto flex max-w-screen-lg gap-4 rounded-xl bg-white p-4">
        <div className="flex flex-col gap-1">
          <div className="w-64">
            <Image
              className="rounded-lg"
              src={image}
              width={800}
              height={800}
              layout="responsive"
              alt={name}
            />
          </div>
          <div>
            <span className="font-gmcafe text-sm uppercase tracking-wider text-purple">
              Birthday
            </span>
            <p className="text-sm text-purple">{birthday}</p>
          </div>
          <div>
            <span className="font-gmcafe text-sm uppercase tracking-wider text-purple">Status</span>
            <p className="text-sm text-purple">{status}</p>
          </div>
        </div>
        <div>
          <h1 className="font-gmcafe text-4xl text-purple">{name}</h1>
          <p style={{ borderColor: bgColor }} className="border-b pb-2 text-xs text-purple">
            {owner}
          </p>
          <div className="grid grid-cols-2 pt-2">
            {attributes
              .filter(({ trait_type }) => !customRenderTraits.includes(trait_type))
              .map(({ value, trait_type }) => (
                <div key={`${trait_type}-${value}`}>
                  <span className="font-gmcafe text-sm uppercase tracking-wider text-purple">
                    {trait_type}
                  </span>
                  <p className="text-sm text-purple">{value}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
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
  return {
    props: {
      id: params?.id,
    },
  };
};
