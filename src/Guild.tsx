import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchGuild from "./SearchGuild";
import styled from "styled-components";
import { GuildMemberHistoryRecord, fetchGuildMembersHistory } from "./api";
import { Skeleton } from "@mui/material";

const GuildWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (guildName) {
      setLoading(true);
      fetchGuildMembersHistory(guildName)
        .then(setHistory)
        .finally(() => setLoading(false));
    }
  }, [guildName]);

  return (
    <GuildWrapper>
      <SearchGuild guild={guildName} />
      {loading ? (
        <Skeleton variant="rectangular" width={400} height={500} />
      ) : (
        <div className="history">
          {history.map((h) => (
            <PlayerRecord key={`${h.date}${h.playerName}`} record={h} />
          ))}
        </div>
      )}
    </GuildWrapper>
  );
};

export default Guild;
