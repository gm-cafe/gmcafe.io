import classNames from 'classnames';
import { useFilterContext } from '../../lib/providers/FilterContext';

type QuickFilter = {
  emoji: string;
  type: string;
  values: string[];
};

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
    values: ['Pizza'],
  },
  {
    emoji: '🎮',
    type: 'Item',
    values: ['Controller'],
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
    values: ['Candy', 'Cookie', 'Ice Cream', 'Cupcake', 'Donut', 'Lollypop'],
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
];

const QuickFilters = () => {
  const { filters, toggleFilters } = useFilterContext();

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
              'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 transition-colors',
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
