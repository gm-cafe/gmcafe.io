import classNames from 'classnames';
import { useEntryContext } from '../../lib/providers/EntryContext';

const Toolbar = () => {
  const { type, setType, metadata } = useEntryContext();

  return (
    <div className="flex justify-between">
      <div className="divide-x">
        <button
          className={classNames(
            'h-10 w-16 rounded-l-xl font-gmcafe text-xl',
            { 'bg-purple text-white': type === 'moo' },
            { 'bg-white text-purple': type !== 'moo' }
          )}
          onClick={() => setType('moo')}
        >
          Moo
        </button>
        <button
          className={classNames(
            'h-10 w-16 rounded-r-xl font-gmcafe text-xl',
            { 'bg-purple text-white': type === 'rawr' },
            { 'bg-white text-purple': type !== 'rawr' }
          )}
          onClick={() => setType('rawr')}
        >
          Rawr
        </button>
      </div>
      <p className="font-gmcafe text-4xl uppercase text-purple">{metadata.length} Moos</p>
    </div>
  );
};

export default Toolbar;
