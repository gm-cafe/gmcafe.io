type Props = {
  mints: number;
  setMints: (_mints: number) => void;
  maxMints: number;
};

const Quantity = ({ mints, setMints, maxMints }: Props) => (
  <div className="flex gap-2 rounded-full bg-white font-gmcafe text-2xl">
    <button
      className="h-8 w-8 rounded-full bg-purple text-white disabled:bg-purple-light"
      onClick={() => setMints(mints - 1)}
      disabled={mints <= 1}
    >
      -
    </button>
    <span className="w-4 bg-white text-center text-purple">{mints}</span>
    <button
      className="h-8 w-8 rounded-full bg-purple text-white disabled:bg-purple-light"
      onClick={() => setMints(mints + 1)}
      disabled={mints >= maxMints}
    >
      +
    </button>
  </div>
);

export default Quantity;
