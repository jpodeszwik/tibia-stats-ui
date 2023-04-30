export const fetchGuildNames = async (): Promise<Array<string>> => {
  const res = await fetch("/api/guildNames");
  return await res.json();
};

export type GuildMemberHistoryRecord = {
  playerName: string;
  date: string;
  action: string;
  level?: number;
};

export const fetchGuildMembersHistory = async (
  guildName: string
): Promise<Array<GuildMemberHistoryRecord>> => {
  const res = await fetch(`/api/guildMembersHistory/${guildName}`);
  return await res.json();
};

export type GuildDeathHistoryRecord = {
  characterName: string;
  time: string;
  reason: string;
};

export const fetchGuildDeathHistory = async (
  guildName: string
): Promise<Array<GuildDeathHistoryRecord>> => {
  const res = await fetch(`/api/guildDeaths/${guildName}`);
  return await res.json();
};

export type GuildExpHistoryRecord = {
  date: string;
  exp: number;
};

export const fetchGuilExperienceHistory = async (
  guildName: string
): Promise<Array<GuildExpHistoryRecord>> => {
  const res = await fetch(`/api/guildExp/${guildName}`);
  return await res.json();
};
