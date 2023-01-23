import { useRef } from 'react';
import { useDebounce, useIntersection } from 'react-use';
import { useFilterContext } from '../../lib/providers/FilterContext';

const InfiniteScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  const { loadMore } = useFilterContext();

  useDebounce(() => intersection && intersection.isIntersecting && loadMore(), 150, [intersection]);

  return <div ref={ref} />;
};

export default InfiniteScroll;
