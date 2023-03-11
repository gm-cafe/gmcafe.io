import { NextPage } from 'next';

const Mint: NextPage = () => {
  return <div>Mint!</div>;
};

export default Mint;

export const getServerSideProps = () => {
  return {
    props: {
      title: 'Mint',
      metaDescription: 'Mint your Phase 2 Keekus now!',
    },
  };
};
