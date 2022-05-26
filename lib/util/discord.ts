export type GuildMember = {
  roles: string[];
  user: {
    id?: string;
    username?: string;
    discriminator?: string;
  };
};

export const defaultGuildMember: GuildMember = {
  roles: [],
  user: {},
};

export const discordFetch = async <T>(url: string, accessToken: string): Promise<T> =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
