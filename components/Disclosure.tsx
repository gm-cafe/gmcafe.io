import { Disclosure as Disclosure_ } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { ReactNode } from 'react';

type DisclosureProps = {
  question: string;
  children?: ReactNode | ReactNode[];
};

const Disclosure = ({ question, children }: DisclosureProps) => {
  return (
    <Disclosure_>
      {({ open }) => (
        <>
          <Disclosure_.Button className="mt-2 flex items-center font-gmcafe text-2xl text-purple">
            <span className="mr-2">{question}</span>
            <ChevronUpIcon
              className={classNames(
                { 'rotate-180 transform': open },
                'h-5 w-5 text-purple transition-transform'
              )}
            />
          </Disclosure_.Button>
          <Disclosure_.Panel className="mb-2 text-purple">{children}</Disclosure_.Panel>
        </>
      )}
    </Disclosure_>
  );
};

export default Disclosure;
