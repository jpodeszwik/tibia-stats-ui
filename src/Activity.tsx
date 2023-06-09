import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GuildMemberHistoryRecord, fetchGuildMembersHistory } from "./api";
import { Skeleton } from "@mui/material";
import styled from "styled-components";

const History = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
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

const Activity = () => {
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
    <div>
      {loading ? (
        <Skeleton variant="rectangular" width={400} height={500} />
      ) : (
        <History>
          {history.map((h) => (
            <PlayerRecord key={`${h.date}${h.playerName}`} record={h} />
          ))}
        </History>
      )}
    </div>
  );
};

export default Activity;
