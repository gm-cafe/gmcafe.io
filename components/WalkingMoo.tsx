import { useRef } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';
import Image from 'next/image';

import mooWalk from '../public/moo_walk.gif';

const WalkingCow = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { y } = useWindowScroll();
  const { height, width } = useWindowSize();

  const viewportEnd = ref?.current?.offsetTop || 0;
  const viewportStart = viewportEnd - height;

  const scrollProgress = (y - viewportStart) / height;
  const x = scrollProgress < 0 ? 0 : scrollProgress > 1 ? width : scrollProgress * width;

  return (
    <div ref={ref} className="w-56" style={{ transform: `translateX(${x}px)` }}>
      <Image src={mooWalk} layout="responsive" alt="Moo Walk" />
    </div>
  );
};

export default WalkingCow;
