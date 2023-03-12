import classNames from 'classnames';

type Props = {
  current: number;
  index: number;
  title: string;
};

const StepperItem = ({ current, index, title }: Props) => {
  const itemClassName = 'flex-1 flex flex-col w-32 text-center stepper-item';
  const titleClassName =
    'font-gmcafe text-purple text-lg bg-white rounded-full relative stepper-title';

  return (
    <li
      className={classNames(
        itemClassName,
        { 'after:bg-white': current < index },
        { 'after:bg-purple': current > index },
        { 'after:bg-pink': current === index }
      )}
    >
      <h3 className={classNames(titleClassName, { 'opacity-0': current !== index })}>{title}</h3>
    </li>
  );
};

export default StepperItem;
