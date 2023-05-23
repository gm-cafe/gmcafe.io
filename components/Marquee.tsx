import Image from 'next/image';
import Marquee_ from 'react-fast-marquee';

type MarqueeProps = {
  direction: 'left' | 'right';
  type: 'gmoo' | 'keek';
};

const Marquee = ({ direction, type }: MarqueeProps) => {
  const randomSample = (array: number[], sampleSize: number, rng = Math.random) => {
    array = array.slice(); // make copy
    if (array.length > sampleSize) {
      for (let i = 0; i < sampleSize; i++) {
        // shuffle prefix n
        let temp = array[i];
        let j = Math.floor(i + rng() * (array.length - i));
        array[i] = array[j];
        array[j] = temp;
      }
      array = array.slice(0, Math.max(0, sampleSize)); // truncate
    }
    return array;
  };

  const randomTokens = (numberOfTokens: number, maxId: number) => {
    return randomSample(
      Array(maxId)
        .fill(0)
        .map((_, i) => i + 1),
      numberOfTokens
    );
  };

  const tokenIds = randomTokens(20, type === 'keek' ? 3333 : 333);

  return (
    <Marquee_ gradient={false} direction={direction}>
      {tokenIds.map((id: number) => (
        <div className="m-4" key={`${type}-${id}`}>
          <Image
            className="rounded-lg"
            src={`https://gmcafe.s3.us-east-2.amazonaws.com/${type}/jpg-256/${id}.jpg`}
            width={250}
            height={250}
            layout="fixed"
            alt={(type === 'keek' ? 'Keekusaur #' : 'Highland Cow #') + id}
            unoptimized
          />
        </div>
      ))}
    </Marquee_>
  );
};

export default Marquee;
