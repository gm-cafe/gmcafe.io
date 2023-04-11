import classNames from 'classnames';
import { useEntryContext } from '../../lib/providers/EntryContext';

const Toolbar = () => {
  const { type, setType, metadata, displayName, totalCount } = useEntryContext();

  const pluralizedName = metadata.length > 1 ? `${displayName}s` : displayName;

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 rounded-2xl bg-white p-2">
        <button
          className={classNames(
            'rounded-xl px-4 py-2 font-gmcafe text-xl transition-colors',
            { 'bg-purple text-white': type === 'gmoo' },
            { 'bg-white text-purple hover:bg-purple-light/40': type !== 'gmoo' }
          )}
          onClick={() => setType('gmoo')}
        >
          Moo
        </button>
        <button
          className={classNames(
            'relative rounded-xl px-4 py-2 font-gmcafe text-xl transition-colors',
            { 'bg-purple text-white': type === 'keek' },
            { 'bg-white text-purple hover:bg-purple-light/40': type !== 'keek' }
          )}
          onClick={() => setType('keek')}
        >
          Keek
        </button>
      </div>
      <div className="flex gap-3">
        {metadata.length !== totalCount && (
          <p className="hidden rounded-2xl bg-white p-3 font-gmcafe text-2xl text-pink md:text-3xl lg:block">
            {parseFloat(((metadata.length / totalCount) * 100).toFixed(2))}%
          </p>
        )}
        <p className="rounded-2xl bg-white p-3 font-gmcafe text-2xl text-purple md:text-3xl">
          {metadata.length} {pluralizedName}
        </p>
      </div>
    </div>
  );
};

export default Toolbar;
