import { ChevronRightIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { Dispatch, ReactNode, SetStateAction } from 'react';

type DisclosureProps = {
  question: string;
  children?: ReactNode | ReactNode[];
  index: number;
  open: number | null;
  setOpen: Dispatch<SetStateAction<number | null>>;
};

const Disclosure = ({ question, children, index, open, setOpen }: DisclosureProps) => {
  const isOpen = open === index;
  const onClick = () => (isOpen ? setOpen(null) : setOpen(index));

  return (
    <div>
      <button className="mt-2 flex items-center font-gmcafe text-3xl text-purple" onClick={onClick}>
        <ChevronRightIcon
          className={classNames(
            { 'rotate-90 transform': isOpen },
            'h-8 w-8 text-purple transition-transform'
          )}
        />
        <span className="ml-2">{question}</span>
      </button>
      {isOpen && <div className="my-2 ml-10 text-purple">{children}</div>}
    </div>
  );
};

export default Disclosure;
