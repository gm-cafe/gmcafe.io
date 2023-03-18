import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';

type CustomConnectButtonProps = {
  className?: string;
  variation: 'migration' | 'mint';
};

export const CustomConnectButton = ({ className, variation }: CustomConnectButtonProps) => {
  const migrationClasses =
    'rounded-full bg-pink-light font-gmcafe text-white text-base px-3 py-0.5 text-shadow uppercase';
  const mintClasses =
    'rounded-full bg-white px-8 py-4 text-purple text-4xl font-gmcafe transition-transform hover:scale-110';

  const buttonClasses = variation === 'migration' ? migrationClasses : mintClasses;

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
