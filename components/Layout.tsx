import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import Navigation from './Navigation';

type LayoutProps = {
  children: ReactNode | ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <Navigation open={navOpen} setOpen={setNavOpen} />
      <div className={classNames('h-screen', { 'overflow-y-hidden': navOpen })}>{children}</div>
    </>
  );
};

export default Layout;
