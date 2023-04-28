import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchGuild from "./SearchGuild";
import styled from "styled-components";
import {
  GuildDeathHistoryRecord,
  GuildMemberHistoryRecord,
  fetchGuildMembersHistory,
} from "./api";
import { Skeleton, Tab, Tabs } from "@mui/material";
import Deaths from "./Deaths";
import Activity from "./Activity";

const GuildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .navigation {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .history {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .guild-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Guild = () => {
  const { guildName } = useParams();
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <GuildWrapper>
      <div className="navigation">
        <SearchGuild guild={guildName} />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Activity" />
          <Tab label="Deaths" />
        </Tabs>
      </div>

      <div className="guild-content">
        {value === 0 && <Activity />}
        {value === 1 && <Deaths />}
      </div>
    </GuildWrapper>
  );
};

export default Guild;
