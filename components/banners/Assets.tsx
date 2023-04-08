import Image from 'next/image';

const moos = Array.from(Array(333)).map(
  (_, i) => `https://gmcafe.s3.us-east-2.amazonaws.com/gmoo/transparent/${i + 1}.png`
);

type Props = {
  addAsset: (_file: string) => void;
};

const Assets = ({ addAsset }: Props) => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl bg-white p-4">
      <h2 className="border-b border-purple-light font-gmcafe text-xl uppercase text-purple">
        Assets
      </h2>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto">
        {moos.map((moo) => (
          <div className="flex" key={moo} onClick={() => addAsset(moo)}>
            <Image src={moo} width={300} height={300} alt="Moo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assets;
