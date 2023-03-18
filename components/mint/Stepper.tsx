import StepperItem from './StepperItem';

type Props = {
  index: number;
};

const Stepper = ({ index }: Props) => {
  return (
    <ol className="flex w-full">
      <StepperItem current={index} index={0} title="Connect" />
      <StepperItem current={index} index={1} title="#1" />
      <StepperItem current={index} index={2} title="#2" />
      <StepperItem current={index} index={3} title="#3" />
      <StepperItem current={index} index={4} title="Mint" />
    </ol>
  );
};

export default Stepper;
