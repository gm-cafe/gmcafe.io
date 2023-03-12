import StepperItem from './StepperItem';

type Props = {
  index: number;
};

const Stepper = ({ index }: Props) => {
  return (
    <ol className="flex flex-wrap">
      <StepperItem current={index} index={0} title="Connect" />
      <StepperItem current={index} index={1} title="Desire #1" />
      <StepperItem current={index} index={2} title="Desire #2" />
      <StepperItem current={index} index={3} title="Desire #3" />
      <StepperItem current={index} index={4} title="Mint" />
    </ol>
  );
};

export default Stepper;
