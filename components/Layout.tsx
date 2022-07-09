import classNames from 'classnames';
import { ReactNode, useRef, useState } from 'react';
import CursorTrail from './CursorTrail';
import Navigation from './Navigation';

type LayoutProps = {
  children: ReactNode | ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  const [navOpen, setNavOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <Navigation open={navOpen} setOpen={setNavOpen} />
      <div className={classNames('min-h-screen', { 'overflow-y-hidden': navOpen })} ref={ref}>
        <CursorTrail parentRef={ref} />
        {children}
      </div>
    </>
  );
};

export default Layout;
