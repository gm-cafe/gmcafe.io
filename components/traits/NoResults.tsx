import Image from 'next/image';

import randy from '../../public/randy.png';

const NoResults = () => (
  <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl p-4 md:p-8">
    <h1 className="text-center font-gmcafe text-2xl text-purple md:text-3xl">
      Sorry mate, we couldn&apos;t find anything with that search.
    </h1>
    <h2 className="text-center font-gmcafe text-2xl text-purple md:text-3xl">
      Try again using some different words and stuff
    </h2>
    <div className="mt-6 w-28 md:w-40">
      <Image src={randy} layout="responsive" alt="" />
    </div>
  </div>
);

export default NoResults;
