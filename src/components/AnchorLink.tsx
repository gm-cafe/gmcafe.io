import Link from 'next/link';
import { ReactNode } from 'react';

type AnchorLinkProps = {
  href: string;
  children: ReactNode;
  disabled?: boolean;
};

const AnchorLink = ({ href, children, disabled }: AnchorLinkProps) => {
  const className = 'rounded-full bg-pink px-6 py-2 font-gmcafe text-lg uppercase text-white transition-opacity hover:opacity-80';

  if (disabled) {
    return <span className={`${className} cursor-not-allowed opacity-50`}>{children}</span>;
  }

  if (href.startsWith('/')) {
    return <Link href={href} className={className}>{children}</Link>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
};

export default AnchorLink;
