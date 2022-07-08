import { ReactNode } from 'react';

type AnchorLinkProps = {
  href: string;
  children?: ReactNode | ReactNode[];
};

const AnchorLink = ({ href, children }: AnchorLinkProps) => {
  return (
    <a
      className="text-shadow rounded-full bg-pink-light px-4 pt-1 font-gmcafe text-2xl uppercase text-white transition sm:px-5 lg:text-3xl betterhover:hover:scale-105 betterhover:hover:shadow"
      href={href}
    >
      {children}
    </a>
  );
};

export default AnchorLink;
