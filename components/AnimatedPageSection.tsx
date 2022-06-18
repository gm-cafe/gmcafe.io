import classNames from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useIntersection } from 'react-use';

type AnimatedPageSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode | ReactNode[];
};

const AnimatedPageSection = ({ id, className, children }: AnimatedPageSectionProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const ref = useRef(null);
  const intersection = useIntersection(ref, {});

  useEffect(() => {
    const inViewport = intersection && intersection.intersectionRatio > 0;
    !showAnimation && inViewport && setShowAnimation(true);
  }, [showAnimation, intersection]);

  return (
    <section
      id={id}
      ref={ref}
      className={classNames(className, {
        'animate-section': showAnimation,
        'opacity-0': !showAnimation,
      })}
    >
      {children}
    </section>
  );
};

export default AnimatedPageSection;
