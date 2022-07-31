import Head from 'next/head';
import { useContractRead } from 'wagmi';
import { gmooABI, gmooContract } from '../lib/util/addresses';

const MigrateRemaining = () => {
  const { data } = useContractRead({
    addressOrName: gmooContract,
    contractInterface: gmooABI,
    functionName: 'getHerd',
  });

  const migratedMoos = data?.map(herd => parseInt(herd.slice(3, 6), 16))

  console.log(migratedMoos)

  return <div className="bg-pink-background max-w-screen-xl min-h-screen pt-36">
    <Head>
      <title>Remaining Moos</title>
    </Head>
  </div>
};

export default MigrateRemaining;
