import { NextPage } from 'next';
import Head from 'next/head';
import HerdGroup from '../components/leaderboard/HerdGroup';
import useGetHerd from '../lib/hooks/useGetHerd';
import { HerdInfo, HerdInfoByOwner } from '../lib/util/types';

const description =
  'Welcome to the world and characters of GMCafé, most succulent and tantalising establishment in the metaverse.';

const Leaderboard: NextPage = () => {
  const herd = useGetHerd();

  const owners: Record<string, HerdInfo[]> = {};
  herd.forEach((moo) => {
    const { owner } = moo;
    if (owners[owner]) {
      owners[owner].push(moo);
    } else {
      owners[owner] = [moo];
    }
  });

  const herdInfoByOwner: HerdInfoByOwner[] = Object.entries(owners).map(([owner, herd]) => ({
    owner,
    herd,
  }));

  const herdInfoByCount: Record<number, HerdInfoByOwner[]> = {};
  herdInfoByOwner.forEach((herdInfo) => {
    const count = herdInfo.herd.length;
    if (herdInfoByCount[count]) {
      herdInfoByCount[count].push(herdInfo);
    } else {
      herdInfoByCount[count] = [herdInfo];
    }
  });

  const orderedHerdInfoByCount = Object.entries(herdInfoByCount)
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .filter(([count]) => parseInt(count) > 1);

  return (
    <div className="min-h-screen bg-pink-background">
      <Head>
        <title>Leaderboard</title>
        <meta property="og:image" content="https://gmcafe.io/meta_image.png" />
        <meta name="twitter:image" content="https://gmcafe.io/meta_image.png" />
        <meta name="description" content={description} key="desc" />
        <meta property="og:description" content={description} key="ogDesc" />
        <meta name="twitter:description" content={description} key="twitterDesc" />
      </Head>
      <div className="flex w-full max-w-screen-md flex-col items-center gap-8 px-4 pt-44 pb-4 md:mx-auto">
        <h1 className="text-border-white font-gmcafe text-5xl text-purple">Leaderboard</h1>
        {orderedHerdInfoByCount.map(([count, herdByOwner], idx) => (
          <HerdGroup key={count} count={parseInt(count)} herdByOwner={herdByOwner} rank={idx + 1} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
