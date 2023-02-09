import classNames from 'classnames';
import { useFilterContext } from '../../lib/providers/FilterContext';

type Props = {
  type: string;
};

const TOGGLE_VALUE = 'Yes';

const FilterToggle = ({ type }: Props) => {
  const { filters, addFilter, removeFilter } = useFilterContext();

  const id = `${type}-${TOGGLE_VALUE}`;

  const toggled = filters[type] && filters[type].has(TOGGLE_VALUE);

  const onClick = () =>
    toggled ? removeFilter(type, TOGGLE_VALUE) : addFilter(type, TOGGLE_VALUE);

  return (
    <div className="border-primary flex flex-col border-b">
      <div className="flex py-5">
        <span className="flex-1 text-left font-gmcafe text-xl uppercase tracking-wider text-purple">
          {type}
        </span>
        <input
          className="absolute h-6 w-6 opacity-0"
          id={id}
          type="checkbox"
          checked={toggled}
          onClick={onClick}
        />
        <div
          className={classNames(
            'flex h-6 w-6 items-center justify-center rounded-sm',
            { 'bg-purple': toggled },
            { 'border-2 border-purple-light bg-white': !toggled }
          )}
          onClick={onClick}
        >
          <svg
            className={classNames({ hidden: !toggled }, { block: toggled })}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 7L6.28261 12L12.5 2"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterToggle;
