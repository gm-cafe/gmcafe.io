import DiscordButton, { DiscordButtonProps } from '../DiscordButton';

const DiscordNotConnected = ({ authUrl, guildMember }: DiscordButtonProps) => {
  return (
    <>
      <h1 className="mb-4 text-4xl font-bold">Welcome to the Café!</h1>
      <DiscordButton authUrl={authUrl} guildMember={guildMember} />
    </>
  );
};

export default DiscordNotConnected;
