import { useState } from "react";
import styled from "styled-components";
import { Tab, Tabs } from "@mui/material";
import Deaths from "./Deaths";
import Activity from "./Activity";
import Layout from "./Layout";

const GuildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Guild = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <GuildWrapper>
        <div className="navigation">
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
    </Layout>
  );
};

export default Guild;
