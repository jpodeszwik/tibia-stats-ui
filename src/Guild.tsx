import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchGuild from "./SearchGuild";
import styled from "styled-components";
import { GuildMemberHistoryRecord, fetchGuildMembersHistory } from "./api";

const GuildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .history {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

type ActionProps = {
  action: string;
};

const Action = ({ action }: ActionProps) => {
  const isLeave = action === "LEAVE";
  return (
    <span style={{ color: isLeave ? "red" : "green" }}>
      {isLeave ? "left" : "joined"}
    </span>
  );
};

type PlayerRecordProps = {
  record: GuildMemberHistoryRecord;
};

const PlayerRecord = ({ record }: PlayerRecordProps) => {
  return (
    <div>
      {record.date} {record.playerName} <Action action={record.action} />{" "}
      {record.level && `at level ${record.level}`}
    </div>
  );
};

const Guild = () => {
  const { guildName } = useParams();
  const [history, setHistory] = useState<Array<GuildMemberHistoryRecord>>([]);

  useEffect(() => {
    if (guildName) {
      fetchGuildMembersHistory(guildName).then(setHistory);
    }
  }, [guildName]);

  return (
    <GuildWrapper>
      <SearchGuild guild={guildName} />
      <div className="history">
        {history.map((h) => (
          <PlayerRecord record={h} />
        ))}
      </div>
    </GuildWrapper>
  );
};

export default Guild;
