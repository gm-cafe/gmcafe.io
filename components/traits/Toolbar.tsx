import classNames from 'classnames';
import { useEntryContext } from '../../lib/providers/EntryContext';

const Toolbar = () => {
  const { type, setType, metadata, displayName } = useEntryContext();

  const pluralizedName = metadata.length > 1 ? `${displayName}s` : displayName;

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 rounded-2xl bg-white p-2">
        <button
          className={classNames(
            'h-10 w-16 rounded-xl font-gmcafe text-xl transition-colors',
            { 'bg-purple text-white': type === 'gmoo' },
            { 'bg-white text-purple hover:bg-purple-light/40': type !== 'gmoo' }
          )}
          onClick={() => setType('gmoo')}
        >
          Moo
        </button>
        <button
          className={classNames(
            'relative h-10 w-16 rounded-xl font-gmcafe text-xl transition-colors',
            { 'bg-purple text-white': type === 'keek' },
            { 'bg-white text-purple hover:bg-purple-light/40': type !== 'keek' }
          )}
          onClick={() => setType('keek')}
        >
          Keeku
        </button>
      </div>
      <p className="rounded-2xl bg-white p-2 font-gmcafe text-2xl text-purple md:text-4xl">
        {metadata.length} {pluralizedName}
      </p>
    </div>
  );
};

export default Toolbar;
