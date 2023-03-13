import CardStack from './CardStack';

type Props = {
  current: number;
};

const Preferences = ({ current }: Props) => {
  return (
    <div className="flex flex-col items-center gap-8 md:flex-row">
      <CardStack current={current} />
      <span className="font-gmcafe text-4xl text-purple">OR</span>
      <CardStack current={current} />
    </div>
  );
};

export default Preferences;
