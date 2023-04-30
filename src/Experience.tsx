import { useEffect, useState } from "react";
import { GuildExpHistoryRecord, fetchGuilExperienceHistory } from "./api";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Tooltip, Skeleton } from "@mui/material";

const GuildExpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .red {
    color: red;
  }

  .green {
    color: green;
  }
`;

type ExpIncrement = {
  date: string;
  increment: number;
};

type ReduceAcc = {
  previous?: GuildExpHistoryRecord;
  values: Array<ExpIncrement>;
};

const formatExp = (val: number): string => {
  const sign = Math.sign(val);
  const abs = Math.abs(val);
  if (abs > 1000000000) {
    return `${sign * Math.floor(abs / 1000000000)}kkk`;
  } else if (abs > 1000000) {
    return `${sign * Math.floor(abs / 1000000)}kk`;
  } else if (abs > 1000) {
    return `${sign * Math.floor(abs / 1000)}k`;
  }
  return `${val}`;
};

type ExpValueProps = {
  val: number;
};

const ExpValue = ({ val }: ExpValueProps) => {
  const colorClass = val > 0 ? 'green' : val < 0 ? 'red' : undefined;
  return (
    <Tooltip title={val}>
      <span className={colorClass}>{formatExp(val)}</span>
    </Tooltip>
  );
};

const Experience = () => {
  const { guildName } = useParams();
  const [guildExp, setGuildExp] = useState<Array<GuildExpHistoryRecord>>([]);
  const [loading, setLoading] = useState(false);

  const expIncrements = guildExp.reduce<ReduceAcc>(
    (acc, current) => {
      if (acc.previous) {
        acc.values.push({
          date: acc.previous.date,
          increment: acc.previous.exp - current.exp,
        });
      }

      return {
        previous: current,
        values: acc.values,
      };
    },
    { previous: undefined, values: [] }
  ).values;

  useEffect(() => {
    if (guildName) {
      setLoading(true);
      fetchGuilExperienceHistory(guildName)
        .then(setGuildExp)
        .finally(() => setLoading(false));
    }
  }, [guildName]);

  return (
    <div>
      {loading ? (
        <Skeleton variant="rectangular" width={400} height={500} />
      ) : (
        <GuildExpWrapper>
          {expIncrements.map((e) => (
            <div>
              <span>
                {e.date} <ExpValue val={e.increment} />
              </span>
            </div>
          ))}
        </GuildExpWrapper>
      )}
    </div>
  );
};

export default Experience;
