import Image from 'next/image';
import { metadata } from '../lib/constants';
import shuffle from '../lib/util/shuffle';
import Marquee_ from 'react-fast-marquee';

type MarqueeProps = {
  direction: 'left' | 'right';
};

const Marquee = ({ direction }: MarqueeProps) => {
  const elements = shuffle(metadata).slice(0, 20);
  return (
    <Marquee_ gradient={false} direction={direction}>
      {elements.map(({ imageUrl, token }) => (
        <div className="m-4" key={token}>
          <Image
            className="rounded-lg"
            src={imageUrl}
            width={250}
            height={250}
            layout="fixed"
            alt={token}
          />
        </div>
      ))}
    </Marquee_>
  );
};

export default Marquee;
