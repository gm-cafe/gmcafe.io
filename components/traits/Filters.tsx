import { traitTypes } from '../../lib/static/metadata';
import Filter from './Filter';
import Search from './Search';

const Filters = () => {
  return (
    <div className="hidden w-full md:block">
      <div className="flex flex-col rounded-xl bg-white p-6">
        <h2 className="border-primary border-b pb-5 font-gmcafe text-4xl uppercase text-purple">
          Filter
        </h2>
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
