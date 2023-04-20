import { ChevronDownIcon } from '@heroicons/react/solid';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';

type CustomConnectButtonProps = {
  className?: string;
  variation: 'migration' | 'mint';
  disabled?: boolean;
  showAccount?: boolean;
};

export const CustomConnectButton = ({
  className,
  variation,
  disabled = false,
  showAccount = false,
}: CustomConnectButtonProps) => {
  const migrationClasses =
    'rounded-full bg-pink-light font-gmcafe text-white text-base px-3 py-0.5 text-shadow uppercase';
  const mintClasses =
    'rounded-full bg-white px-6 md:px-8 py-3 md:py-4 text-purple text-2xl md:text-4xl font-gmcafe transition-transform hover:scale-110 disabled:opacity-70 disabled:hover:scale-100';

  const buttonClasses = variation === 'migration' ? migrationClasses : mintClasses;

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted, openAccountModal }) => {
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
                disabled={disabled}
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

          return showAccount ? (
            <button
              onClick={openAccountModal}
              type="button"
              className="flex gap-2 rounded-lg bg-white py-1 pl-2 pr-1 font-gmcafe text-2xl text-purple transition-transform hover:scale-105"
            >
              <span>{account.displayBalance ? ` ${account.displayBalance}` : ''}</span>
              <span className="flex items-center gap-0.5 rounded-md bg-purple pl-2 pr-1 text-white">
                {account.displayName}
                <ChevronDownIcon className="h-6 w-6" />
              </span>
            </button>
          ) : null;
        })();
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
