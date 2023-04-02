import classNames from 'classnames';
import { useState } from 'react';
import { useEntryContext } from '../../lib/providers/EntryContext';

const Toolbar = () => {
  const [hover, setHover] = useState(false);
  const { type, setType, metadata, displayName } = useEntryContext();

  const pluralizedName = metadata.length > 1 ? `${displayName}s` : displayName;

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 rounded-2xl bg-white p-2">
        <button
          className={classNames(
            'h-10 w-16 rounded-xl font-gmcafe text-xl transition-colors',
            { 'bg-purple text-white': type === 'moo' },
            { 'bg-white text-purple hover:bg-purple-light/40': type !== 'moo' }
          )}
          onClick={() => setType('moo')}
        >
          Moo
        </button>
        <button
          className={classNames(
            'relative h-10 w-16 rounded-xl font-gmcafe text-xl transition-colors',
            { 'bg-purple text-white': type === 'keeku' },
            { 'bg-white text-purple hover:bg-purple-light/40': type !== 'keeku' }
          )}
          // onClick={() => setType('keeku')}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Keeku
          <div
            className={classNames(
              'absolute left-[120%] top-0.5 whitespace-nowrap rounded-lg bg-white px-3 py-1 transition-opacity',
              { 'opacity-100': hover },
              { 'opacity-0': !hover }
            )}
          >
            Coming soon!
          </div>
        </button>
      </div>
      <p className="rounded-2xl bg-white p-2 font-gmcafe text-2xl text-purple md:text-4xl">
        {metadata.length} {pluralizedName}
      </p>
    </div>
  );
};

export default Toolbar;
