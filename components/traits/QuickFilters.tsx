import classNames from 'classnames';
import { useEntryContext } from '../../lib/providers/EntryContext';
import { useFilterContext } from '../../lib/providers/FilterContext';

type QuickFilter = {
  emoji: string;
  type: string;
  values: string[];
};

const mooQuickFilters: QuickFilter[] = [
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
    values: ['Shirt', 'Collared Shirt'],
  },
  {
    emoji: '👓',
    type: 'Eyewear',
    values: ['Rimmed', 'Square', 'Goggles'],
  },
  {
    emoji: '🍕',
    type: 'Item',
    values: ['Pizza', 'Burger', 'Chips', 'Fries', 'Popcorn', 'Sausage', 'Taco'],
  },
  {
    emoji: '🎮',
    type: 'Item',
    values: ['Controller', 'Phone', 'Tablet'],
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
    emoji: '🐔',
    type: 'Buddy',
    values: ['Yes'],
  },
  {
    emoji: '🍬',
    type: 'Item',
    values: ['Candy', 'Cookie', 'Ice Cream', 'Popsicles', 'Lollypop', 'Cotton Candy'],
  },
  {
    emoji: '⚔️',
    type: 'Item',
    values: [
      'Bat',
      'Katana',
      'Axe',
      'Bazooka',
      'Chainsaw',
      'Cleaver',
      'Eth Spear',
      'Fangs',
      'Fierce Diety Sword',
      'Fists',
      'M00N Cepter',
      'Mech Shooter',
      'Ninja Stars',
      'Nunchaku',
      'Pirate Hook',
      'Pipe',
      'Power Ball',
      'Sickle',
      'Slingshot',
      'Staff',
      'Wand',
      'Water Pistol',
      'Wrench',
      'Zweihander',
    ],
  },
  {
    emoji: '🍵',
    type: 'Beverage',
    values: ['Tea'],
  },
  {
    emoji: '❤️',
    type: 'Blush',
    values: ['Yes'],
  },
  {
    emoji: '💇',
    type: 'Hair',
    values: ['Styled'],
  },
  {
    emoji: '🍆',
    type: 'Item',
    values: ['Apple', 'Pineapple', 'Lettuce', 'Corn', 'Flower', 'Flowers', 'Leek'],
  },
  {
    emoji: '🍞',
    type: 'Item',
    values: ['Donut', 'Cupcake', 'Bowl', 'Croissant', 'Pretzel', 'Toast', 'Hoagie'],
  },
  {
    emoji: '🪙',
    type: 'Crypto',
    values: ['Yes'],
  },
];

const QuickFilters = () => {
  const { filters, toggleFilters } = useFilterContext();
  const { type } = useEntryContext();

  const quickFilters = type === 'moo' ? mooQuickFilters : type === 'rawr' ? [] : [];

  return (
    <div className="flex flex-wrap justify-between gap-2 border-b border-purple-light pb-4">
      {quickFilters.map(({ emoji, type, values }, idx) => {
        const filterValues = filters[type];
        const toggled = values.every((value) => filterValues && filterValues.has(value));
        return (
          <span
            key={`${emoji}-${idx}`}
            onClick={() => toggleFilters(type, values)}
            className={classNames(
              'flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full border-2 transition-colors',
              { 'border-purple bg-purple': toggled },
              { 'border-purple-light bg-white': !toggled }
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
