import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

import metadata from '../../lib/static/metadata';
import FilterCheckbox from './FilterCheckbox';

type Props = {
  type: string;
};

const Filter = ({ type }: Props) => {
  const rawValues = metadata.flatMap((element) =>
    element.attributes
      .filter((attribute) => attribute.trait_type === type)
      .map((attribute) => attribute.value)
  );

  const values: Record<string, number> = {};

  for (const value of rawValues) {
    values[value] = values[value] ? values[value] + 1 : 1;
  }

  const entries = Object.entries(values).sort(([valA, countA], [valB, countB]) =>
    countA === countB ? valA.localeCompare(valB) : countB - countA
  );

  return (
    <Disclosure>
      <div className="border-primary flex flex-col border-b">
        <Disclosure.Button className="flex py-5">
          {({ open }) => (
            <>
              <span className="flex-1 text-left font-gmcafe text-xl uppercase tracking-wider text-purple">
                {type}
              </span>
              <ChevronRightIcon
                className={classNames('w-6 text-purple transition-transform', {
                  'rotate-90': open,
                })}
              />
            </>
          )}
        </Disclosure.Button>
        <Disclosure.Panel className="mb-4 flex max-h-80 flex-col gap-4 overflow-y-auto">
          {entries.map(([value, count]) => (
            <FilterCheckbox key={value} value={value} count={count} type={type} />
          ))}
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
};

export default Filter;
