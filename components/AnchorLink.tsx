import { ReactNode } from 'react';

type AnchorLinkProps = {
  href: string;
  children?: ReactNode | ReactNode[];
};

const AnchorLink = ({ href, children }: AnchorLinkProps) => {
  return (
    <a
      className="text-shadow rounded-full bg-pink-light px-4 sm:px-5 pt-1 font-gmcafe text-2xl uppercase text-white lg:text-3xl"
      href={href}
    >
      {children}
    </a>
  );
};

export default AnchorLink;
