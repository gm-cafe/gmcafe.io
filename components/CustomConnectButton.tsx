import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';

type CustomConnectButtonProps = {
  className?: string;
  variation: 'checkin' | 'migration';
};

export const CustomConnectButton = ({ className, variation }: CustomConnectButtonProps) => {
  const checkInClasses =
    'rounded-lg bg-pink px-4 pb-2 pt-3 font-gmcafe text-xl font-semibold uppercase text-white shadow transition-transform hover:scale-105 sm:px-6 sm:pb-3 sm:pt-4 sm:text-2xl';
  const migrationClasses =
    'rounded-full bg-pink-light font-gmcafe text-white text-base px-3 py-0.5 text-shadow uppercase';

  const buttonClasses = variation === 'checkin' ? checkInClasses : migrationClasses;

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        return (() => {
          if (!mounted || !account || !chain) {
            return (
              <button
                className={classNames(
                  buttonClasses,
                  { 'pointer-events-none select-none opacity-0': !mounted },
                  className
                )}
                onClick={openConnectModal}
                type="button"
              >
                Connect Wallet
              </button>
            );
          }

          if (chain.unsupported) {
            return (
              <button
                className={classNames(buttonClasses, className)}
                onClick={openChainModal}
                type="button"
              >
                Wrong network
              </button>
            );
          }

          return null;
        })();
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
