import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFilterContext } from '../../lib/providers/FilterContext';
import metadata from '../../lib/static/metadata';
import Card from './Card';
import InfiniteScroll from './InfiniteScroll';
import Viewer from './Viewer';

const useQueryId = () => {
  const { query } = useRouter();
  const { id } = query;
  const parsedId = id ? (typeof id === 'string' ? parseInt(id) : parseInt(id[0])) : undefined;
  return !parsedId || parsedId < 1 || parsedId > 10000 ? undefined : parsedId;
};

const Cards = () => {
  const queryId = useQueryId();
  const [id, setId] = useState(queryId);

  const { filters, count } = useFilterContext();
  const entries = Object.entries(filters);

  const emptyEntries = entries.every(([, values]) => values.size === 0);

  const filtered = metadata.filter(({ attributes }) =>
    entries.every(([type, values]) => {
      // removing filters can result in an empty set
      if (emptyEntries || values.size === 0) {
        return true;
      }

      const trait = attributes.find((attribute) => attribute.trait_type === type);

      return trait ? values.has(trait.value) : false;
    })
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7">
        {filtered.slice(0, count).map((element) => (
          <Card key={element.id} moo={element} setOpen={() => setId(element.id)} />
        ))}
      </div>
      <InfiniteScroll />
      <Viewer id={id} onClose={() => setId(undefined)} />
    </div>
  );
};

export default Cards;
