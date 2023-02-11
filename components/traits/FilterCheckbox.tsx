import classNames from 'classnames';
import { useFilterContext } from '../../lib/providers/FilterContext';

type Props = {
  type: string;
  value: string;
  count: number;
};

const FilterCheckbox = ({ value, count, type }: Props) => {
  const { filters, addFilter, removeFilter } = useFilterContext();

  const id = `${type}-${value}`;

  const toggled = filters[type] && filters[type].has(value);

  const onClick = () => (toggled ? removeFilter(type, value) : addFilter(type, value));

  return (
    <div className="relative flex items-center gap-4">
      <input
        className="absolute h-6 w-6 cursor-pointer opacity-0"
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
      <label
        className="cursor-pointer select-none font-medium tracking-wider text-purple"
        htmlFor={id}
      >{`${value} (${count})`}</label>
    </div>
  );
};

export default FilterCheckbox;
