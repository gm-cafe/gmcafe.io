import classNames from 'classnames';
import Link from 'next/link';
import { ReactNode } from 'react';

type AnchorLinkProps = {
  href: string;
  children?: ReactNode | ReactNode[];
  disabled?: boolean;
};

const AnchorLink = ({ href, children, disabled }: AnchorLinkProps) => {
  const isNextLink = href.startsWith('/');

  const anchor = (
    <a
      className={classNames(
        { 'pointer-events-none opacity-50': disabled },
        { 'betterhover:hover:scale-105 betterhover:hover:shadow': !disabled },
        'text-shadow rounded-full bg-pink-light px-4 pt-1 font-gmcafe text-2xl uppercase text-white transition sm:px-5 lg:text-3xl'
      )}
      href={isNextLink ? undefined : href}
    >
      {children}
    </a>
  );

  return isNextLink ? <Link href={href}>{anchor}</Link> : anchor;
};

export default AnchorLink;
