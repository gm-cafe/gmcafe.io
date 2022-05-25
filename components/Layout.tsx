import { ReactNode } from 'react';
import Navigation from './Navigation';

type LayoutProps = {
  children: ReactNode | ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-2">
      <Navigation />
      {children}
    </main>
  );
};

export default Layout;
