import Head from 'next/head';
import { useContractRead } from 'wagmi';
import { gmooABI, gmooContract } from '../lib/util/addresses';
import Image from 'next/image';

const lazyMintedMoos = [
  206, 223, 235, 238, 300, 308, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 333,
];

const MigrateRemaining = () => {
  const { data } = useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'getHerd',
  });

  const migratedMoos = data?.map((herd) => parseInt(herd.slice(3, 6), 16));
  const unmigratedMoos = Array.from(Array(333).keys())
    .map((i) => i + 1)
    .filter((i) => !migratedMoos?.includes(i) && !lazyMintedMoos.includes(i));

  return (
    <div className="min-h-screen bg-pink-background pt-36 pb-12 md:pt-40">
      <Head>
        <title>Remaining Moos</title>
      </Head>
      <div className="mx-auto flex max-w-screen-xl flex-wrap justify-center gap-4">
        {unmigratedMoos.map((id) => (
          <div className="relative w-40" key={id}>
            <Image
              className="rounded-xl"
              src={`https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/jpg/${id}.jpg`}
              layout="responsive"
              width={800}
              height={800}
              alt={`Highland Cow #${id}`}
            />
            <span className="absolute top-0 right-0 rounded-bl-lg rounded-tr-xl bg-white px-2 font-gmcafe text-lg text-purple 2xl:text-2xl">
              {id}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MigrateRemaining;
