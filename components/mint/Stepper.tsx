import StepperItem from './StepperItem';

type Props = {
  index: number;
};

const Stepper = ({ index }: Props) => {
  return (
    <ol className="flex w-full">
      <StepperItem current={index} index={0} title="Connect" />
      <StepperItem current={index} index={1} title="Story" />
      <StepperItem current={index} index={2} title="Choose" />
      <StepperItem current={index} index={3} title="Influence" />
      <StepperItem current={index} index={4} title="Adopt" />
    </ol>
  );
};

export default Stepper;
