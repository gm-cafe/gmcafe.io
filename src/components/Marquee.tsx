'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type MarqueeProps = {
  direction: 'left' | 'right';
  type: 'gmoo' | 'keek';
};

const randomSample = (max: number, size: number): number[] => {
  const arr = Array.from({ length: max }, (_, i) => i + 1);
  for (let i = 0; i < size; i++) {
    const j = Math.floor(i + Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, size);
};

const Marquee = ({ direction, type }: MarqueeProps) => {
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  useEffect(() => {
    setTokenIds(randomSample(type === 'keek' ? 3333 : 333, 20));
  }, [type]);

  const items = tokenIds.map((id) => (
    <div className="m-4 shrink-0" key={`${type}-${id}`}>
      <Image
        className="rounded-lg"
        src={`https://gmcafe.s3.us-east-2.amazonaws.com/${type}/jpg-256/${id}.jpg`}
        width={250}
        height={250}
        alt={(type === 'keek' ? 'Keekusaur #' : 'Highland Cow #') + id}
        unoptimized
      />
    </div>
  ));

  return (
    <div className="overflow-hidden">
      <div className={`flex w-max ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}>
        {items}
        {items}
      </div>
    </div>
  );
};

export default Marquee;
