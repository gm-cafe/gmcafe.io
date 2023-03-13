import { NextPage } from 'next';
import Preferences from '../components/mint/Preferences';
import Stepper from '../components/mint/Stepper';

const Mint: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center bg-pink-background pt-40 pb-12">
      <div className="mx-auto flex w-full max-w-screen-sm flex-col items-center justify-center gap-8">
        <Stepper index={2} />
        <Preferences current={0} />
      </div>
    </div>
  );
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
