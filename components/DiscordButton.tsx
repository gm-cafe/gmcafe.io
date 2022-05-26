import classNames from 'classnames';
import { GuildMember } from '../lib/util/discord';

type DiscordButtonProps = {
  authUrl: string;
  guildMember: GuildMember;
};

const DiscordButton = ({ authUrl, guildMember }: DiscordButtonProps) => {
  const {
    user: { username, discriminator },
  } = guildMember;

  const name = `${username}#${discriminator}`;

  const authorize = () => {
    if (username) {
      return;
    }
    window && window.location.assign(authUrl);
  };

  return (
    <button
      onClick={authorize}
      className={classNames(
        'rounded-xl bg-discord px-3 font-bold text-white transition-transform',
        { 'hover:scale-105': !username }
      )}
    >
      {username ? name : 'Connect Discord'}
    </button>
  );
};

export default DiscordButton;
