import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DiscordButton from '../components/DiscordButton';
import { DISCORD_GUILD_MEMBER_URL, DISCORD_TOKEN_URL } from '../lib/util';
import { defaultGuildMember, discordFetch, GuildMember } from '../lib/util/discord';

type StaticProps = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

const parseQueryParam = (query: string | string[] | undefined) =>
  Array.isArray(query) ? query[0] : query;

const fetchToken = async (code: string, staticProps: StaticProps): Promise<TokenResponse> => {
  const params = new URLSearchParams();
  params.append('client_id', staticProps.clientId);
  params.append('client_secret', staticProps.clientSecret);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', staticProps.redirectUri);
  params.append('code', code);

  return fetch(DISCORD_TOKEN_URL, {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json());
};

const Claim: NextPage<StaticProps> = (props: StaticProps) => {
  const { clientId, redirectUri } = props;
  const [accessToken, setAccessToken] = useState<string>();
  const [guildMember, setGuildMember] = useState<GuildMember>(defaultGuildMember);

  const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=guilds.members.read`;

  const {
    query: { code: _code, state: _state },
  } = useRouter();

  const code = parseQueryParam(_code);

  useEffect(() => {
    code &&
      fetchToken(code, props).then(({ access_token }) => {
        access_token && setAccessToken(access_token);
      });
  }, [code, props]);

  useEffect(() => {
    accessToken &&
      discordFetch<GuildMember>(DISCORD_GUILD_MEMBER_URL, accessToken).then(setGuildMember);
  }, [accessToken]);

  return (
    <main className="flex min-h-screen flex-col items-center py-4">
      <div className="flex w-full justify-end space-x-4 px-4">
        <ConnectButton />
        <DiscordButton authUrl={authUrl} guildMember={guildMember} />
      </div>
    </main>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URL,
    },
  };
};

export default Claim;
