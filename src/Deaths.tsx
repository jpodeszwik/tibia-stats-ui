import { useEffect, useState } from "react";
import { GuildDeathHistoryRecord, fetchGuildDeathHistory } from "./api";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DeathsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 800px;
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

  useEffect(() => {
    if (guildName) {
      fetchGuildDeathHistory(guildName).then(setDeaths);
    }
  }, [guildName]);

  return (
    <DeathsWrapper>
      {deaths.map((death) => (
        <Death key={`${death.time}-${death.characterName}`} record={death} />
      ))}
    </DeathsWrapper>
  );
};

export default Deaths;
