import classNames from 'classnames';
import { useFilterContext } from '../../lib/providers/FilterContext';

type QuickFilter = {
  emoji: string;
  type: string;
  values: string[];
};

const QuickFilters = () => {
  const { filters, toggleFilters } = useFilterContext();

  const quickFilters: QuickFilter[] = [
    {
      emoji: '☕️',
      type: 'Beverage',
      values: ['Coffee'],
    },
    {
      emoji: '🧋',
      type: 'Beverage',
      values: ['Boba'],
    },
    {
      emoji: '🧢',
      type: 'Headwear',
      values: ['Cap'],
    },
    {
      emoji: '👕',
      type: 'Clothing',
      values: ['Shirt'],
    },
    {
      emoji: '👓',
      type: 'Eyewear',
      values: ['Rimmed'],
    },
    {
      emoji: '🧣',
      type: 'Neckwear',
      values: ['Scarf'],
    },
    {
      emoji: '🍕',
      type: 'Item',
      values: ['Pizza'],
    },
    {
      emoji: '🎮',
      type: 'Item',
      values: ['Controller'],
    },
    {
      emoji: '✍️',
      type: 'Delivery',
      values: ['Custom'],
    },
    {
      emoji: '👑',
      type: 'Headwear',
      values: ['Crown'],
    },
    {
      emoji: '💎',
      type: 'Diamond',
      values: ['Yes'],
    },
    {
      emoji: '👂',
      type: 'Earring',
      values: ['Yes'],
    },
    {
      emoji: '🐔',
      type: 'Buddy',
      values: ['Yes'],
    },
    {
      emoji: '🍬',
      type: 'Item',
      values: ['Candy', 'Cookie', 'Ice Cream', 'Cupcake', 'Donut', 'Lollypop'],
    },
    {
      emoji: '🍵',
      type: 'Beverage',
      values: ['Tea'],
    },
  ];

  return (
    <div className="flex flex-wrap justify-evenly gap-2 border-b border-purple-light pb-4">
      {quickFilters.map(({ emoji, type, values }, idx) => {
        const filterValues = filters[type];
        const toggled = values.every((value) => filterValues && filterValues.has(value));
        return (
          <span
            key={`${emoji}-${idx}`}
            onClick={() => toggleFilters(type, values)}
            className={classNames(
              'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 bg-white',
              { 'border-purple bg-purple': toggled },
              { 'border-purple-light': !toggled }
            )}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
};

export default QuickFilters;
