import { Disclosure as Disclosure_ } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

type DisclosureProps = {
  question: string;
  answer: string;
};

const Disclosure = ({ question, answer }: DisclosureProps) => {
  return (
    <Disclosure_>
      {({ open }) => (
        <>
          <Disclosure_.Button className="flex items-center font-gmcafe text-2xl uppercase text-purple">
            <span className="mr-2">{question}</span>
            <ChevronUpIcon
              className={classNames(
                { 'rotate-180 transform': open },
                'h-5 w-5 text-purple transition-transform'
              )}
            />
          </Disclosure_.Button>
          <Disclosure_.Panel className="font-gmcafe text-xl uppercase text-purple">
            {answer}
          </Disclosure_.Panel>
        </>
      )}
    </Disclosure_>
  );
};

export default Disclosure;
