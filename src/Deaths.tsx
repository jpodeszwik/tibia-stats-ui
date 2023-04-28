import { useEffect, useState } from "react";
import { GuildDeathHistoryRecord, fetchGuildDeathHistory } from "./api";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Skeleton } from "@mui/material";

const DeathsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

type DeathProps = {
  record: GuildDeathHistoryRecord;
};

const Death = ({ record }: DeathProps) => {
  const parsedTime = new Date(Date.parse(record.time));
  return (
    <div>
      {parsedTime.toLocaleString()} {record.characterName} {record.reason}
    </div>
  );
};

const Deaths = () => {
  const { guildName } = useParams();
  const [deaths, setDeaths] = useState<Array<GuildDeathHistoryRecord>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (guildName) {
      setLoading(true);
      fetchGuildDeathHistory(guildName)
        .then(setDeaths)
        .finally(() => setLoading(false));
    }
  }, [guildName]);

  return (
    <div>
      {loading ? (
        <Skeleton variant="rectangular" width={400} height={500} />
      ) : (
        <DeathsWrapper>
          {deaths.map((death) => (
            <Death
              key={`${death.time}-${death.characterName}`}
              record={death}
            />
          ))}
        </DeathsWrapper>
      )}
    </div>
  );
};

export default Deaths;
