export const fetchGuildNames = async (): Promise<Array<string>> => {
  const res = await fetch(
    "/api/guildNames"
  );
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
  const res = await fetch(
    `/api/guildMembersHistory/${guildName}`
  );
  return await res.json();
};
