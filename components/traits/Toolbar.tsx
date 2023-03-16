import classNames from 'classnames';
import { useState } from 'react';
import { useEntryContext } from '../../lib/providers/EntryContext';

const Toolbar = () => {
  const [hover, setHover] = useState(false);
  const { type, setType, metadata, displayName } = useEntryContext();

  const pluralizedName = metadata.length > 1 ? `${displayName}s` : displayName;

  return (
    <div className="flex items-center justify-between">
      <div className="divide-x">
        <button
          className={classNames(
            'h-10 w-16 rounded-l-xl font-gmcafe text-xl transition-colors',
            { 'bg-purple text-white': type === 'moo' },
            { 'bg-white text-purple': type !== 'moo' }
          )}
          onClick={() => setType('moo')}
        >
          Moo
        </button>
        <button
          className={classNames(
            'relative h-10 w-16 cursor-none rounded-r-xl font-gmcafe text-xl transition-colors',
            { 'bg-purple text-white': type === 'keeku' },
            { 'bg-white text-purple': type !== 'keeku' }
          )}
          // onClick={() => setType('keeku')}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Keeku
          <div
            className={classNames(
              'absolute left-[110%] top-0.5 whitespace-nowrap rounded-lg bg-white px-3 py-1 transition-opacity',
              { 'opacity-100': hover },
              { 'opacity-0': !hover }
            )}
          >
            Coming soon!
          </div>
        </button>
      </div>
      <p className="font-gmcafe text-3xl text-purple md:text-4xl">
        {metadata.length} {pluralizedName}
      </p>
    </div>
  );
};

export default Toolbar;
