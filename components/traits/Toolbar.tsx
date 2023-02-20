import classNames from 'classnames';
import { useEntryContext } from '../../lib/providers/EntryContext';

const Toolbar = () => {
  const { type, setType } = useEntryContext();

  return (
    <div className="flex">
      <div className="divide-x">
        <button
          className={classNames(
            'rounded-l-xl py-2 pl-3 pr-1 font-gmcafe text-xl',
            { 'bg-purple text-white': type === 'moo' },
            { 'bg-white text-purple': type !== 'moo' }
          )}
          onClick={() => setType('moo')}
        >
          Moo
        </button>
        <button
          className={classNames(
            'rounded-r-xl py-2 pr-3 pl-1 font-gmcafe text-xl',
            { 'bg-purple text-white': type === 'rawr' },
            { 'bg-white text-purple': type !== 'rawr' }
          )}
          onClick={() => setType('rawr')}
        >
          Rawr
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
