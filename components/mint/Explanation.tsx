import Image from 'next/image';

type Props = {
  advance: () => void;
};

const Explanation = ({ advance }: Props) => {
  return (
    <div className="mb-36 mt-4 flex w-full flex-grow flex-col items-center gap-6">
      <p className="rounded-lg bg-white p-4 text-purple">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Est lorem ipsum dolor sit amet. Elementum curabitur vitae
        nunc sed velit dignissim. Amet justo donec enim diam vulputate ut pharetra.
      </p>
      <div className="flex gap-6">
        <button
          className="rounded-full bg-white px-4 py-1.5 font-gmcafe text-3xl uppercase text-purple transition-transform hover:scale-105"
          onClick={advance}
        >
          Influence
        </button>
        <button
          className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-gmcafe text-3xl uppercase text-purple transition-transform hover:scale-105"
          onClick={advance}
        >
          <div className="h-10 w-10">
            <Image src="/mint/dice.png" width={100} height={100} alt="" />
          </div>
          RANDOM
        </button>
      </div>
    </div>
  );
};

export default Explanation;
