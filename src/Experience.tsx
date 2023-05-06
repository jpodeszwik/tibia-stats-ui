import { useEffect, useState } from "react";
import { GuildExpHistoryRecord, fetchGuilExperienceHistory } from "./api";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Tooltip,
  Skeleton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const GuildExpWrapper = styled.div`
  max-width: 600px;
  .red {
    color: red;
  }

  .green {
    color: green;
  }
`;

const TooltipTitle = styled.div`
  ul {
    padding-inline-start: 15px;
    margin-block-start: 0;
    margin-block-end: 0;
    li {
      list-style-type: circle;
    }
  }

  display: flex;
  flex-direction: column;
  gap: 3px;
`;

type ExpIncrement = {
  date: string;
  increment: number;
  expGained: number;
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
  const colorClass = val > 0 ? "green" : val < 0 ? "red" : undefined;
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
          expGained: acc.previous.gainedExp,
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">
                    <Tooltip
                      title={
                        <TooltipTitle>
                          <span>Sum of highscore exp of guild members.</span>
                          <span>This value can increase if:</span>
                          <ul>
                            <li>character joins a guild</li>
                            <li>character gains xp</li>
                            <li>character advances into highscore</li>
                          </ul>
                        </TooltipTitle>
                      }
                    >
                      <span>Highscore Exp</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right"><Tooltip
                      title={
                        <TooltipTitle>
                          <span>Sum of highscore experience gained by guild members.</span>
                          <span>Experience is included if:</span>
                          <ul>
                            <li>character is in the guild at the moment of last membership check</li>
                            <li>character figures in guild's world highscore for current and previous day</li>
                          </ul>
                        </TooltipTitle>
                      }
                    >
                      <span>Gained Exp</span>
                    </Tooltip></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expIncrements.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell align="right">
                      <ExpValue val={row.increment} />
                    </TableCell>
                    <TableCell align="right">
                      <ExpValue val={row.expGained} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </GuildExpWrapper>
      )}
    </div>
  );
};

export default Experience;
