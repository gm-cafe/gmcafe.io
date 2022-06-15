import classNames from 'classnames';
import { ReactNode, useRef } from 'react';
import { useIntersection } from 'react-use';

type AnimatedPageSectionProps = {
  className?: string;
  children: ReactNode | ReactNode[];
};

const AnimatedPageSection = ({ className, children }: AnimatedPageSectionProps) => {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {});

  const inViewport = intersection && intersection.intersectionRatio > 0;

  return (
    <section
      ref={ref}
      className={classNames(className, { 'animate-section': inViewport, 'opacity-0': !inViewport })}
    >
      {children}
    </section>
  );
};

export default AnimatedPageSection;
