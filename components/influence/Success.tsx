import Confetti from '../Confetti';

type Props = {
  back: () => void;
};

const Success = ({ back }: Props) => {
  return (
    <div className="flex w-full flex-col">
      <div>
        <button
          className="rounded-lg bg-purple px-3 py-1 font-gmcafe text-xl text-white"
          onClick={back}
        >
          back
        </button>
      </div>
      <Confetti />
    </div>
  );
};

export default Success;
