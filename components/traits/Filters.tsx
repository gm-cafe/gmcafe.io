import { traitTypes } from '../../lib/static/metadata';
import Filter from './Filter';
import Search from './Search';
import { XCircleIcon } from '@heroicons/react/solid';
import { useFilterContext } from '../../lib/providers/FilterContext';
import classNames from 'classnames';

const Filters = () => {
  const { search, filters, clear } = useFilterContext();

  const hasFilter = search.length > 0 || Object.keys(filters).length > 0;

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
