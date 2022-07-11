import { ReactNode, useRef } from 'react';
import CursorTrail from './CursorTrail';
import Navigation from './Navigation';

type LayoutProps = {
  children: ReactNode | ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <main className="max-h-d-screen overflow-y-auto md:max-h-screen" ref={ref}>
      <Navigation />
      <CursorTrail parentRef={ref} />
      {children}
    </main>
  );
};

export default Layout;
