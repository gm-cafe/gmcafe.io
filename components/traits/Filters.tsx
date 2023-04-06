import Filter from './Filter';
import Search from './Search';
import { XCircleIcon } from '@heroicons/react/solid';
import { useFilterContext } from '../../lib/providers/FilterContext';
import classNames from 'classnames';
import QuickFilters from './QuickFilters';
import { useEntryContext } from '../../lib/providers/EntryContext';
import { Keeku, Moo } from '../../lib/util/types';

type Props = {
  metadata: {
    moos: Moo[];
    keekus: Keeku[];
  };
};

const Filters = ({ metadata }: Props) => {
  const { moos, keekus } = metadata;

  const { search, filters, clear } = useFilterContext();
  const { type } = useEntryContext();

  const hasFilter = search.length > 0 || Object.keys(filters).length > 0;

  const collection = type === 'gmoo' ? moos : keekus;
  const traitTypes = Array.from(
    new Set(
      collection
        .flatMap((element) => element.attributes.map((attribute) => attribute.trait_type))
        .filter((traitType) => !!traitType)
    )
  );

  return (
    <div className="hidden w-full md:block">
      <div className="flex flex-col rounded-xl bg-white p-6">
        <div className="flex items-center justify-between pb-5">
          <h2 className="font-gmcafe text-4xl uppercase text-purple">Filter</h2>
          <XCircleIcon
            onClick={clear}
            className={classNames('h-8 w-8 animate-[fadeIn_300ms] cursor-pointer text-purple', {
              hidden: !hasFilter,
            })}
          />
        </div>
        <Search />
        <QuickFilters />
        {traitTypes
          .filter((traitType) => !['Birth'].includes(traitType))
          .map((traitType) => (
            <Filter key={traitType} type={traitType} />
          ))}
      </div>
    </div>
  );
};

export default Filters;
