type Props = {
  mints: number;
  setMints: (_mints: number) => void;
  maxMints: number;
};

const Quantity = ({ mints, setMints, maxMints }: Props) => (
  <div className="flex gap-2 rounded-full bg-white font-gmcafe text-2xl">
    <button
      className="h-8 w-8 rounded-full bg-purple text-white transition-colors disabled:bg-purple-light md:h-11 md:w-11"
      onClick={() => setMints(mints - 1)}
      disabled={mints <= 1}
    >
      -
    </button>
    <span className="flex items-center justify-center bg-white text-2xl text-purple">
      Mint {mints} Keekusaur{mints > 1 ? 's' : ''} ({maxMints} max)
    </span>
    <button
      className="h-8 w-8 rounded-full bg-purple text-white transition-colors disabled:bg-purple-light md:h-11 md:w-11"
      onClick={() => setMints(mints + 1)}
      disabled={mints >= maxMints}
    >
      +
    </button>
  </div>
);

export default Quantity;
