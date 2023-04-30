import styled from "styled-components";
import { Tab, Tabs } from "@mui/material";
import Layout from "./Layout";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";

const GuildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Guild = () => {
  const { guildName } = useParams();
  const navigate = useNavigate();
  const match = useMatch("guild/:guildName/:tab");

  const handleChange = (_: React.SyntheticEvent, newValue: String) => {
    navigate(`/guild/${guildName}/${newValue}`);
  };

  return (
    <Layout>
      <GuildWrapper>
        <div className="navigation">
          <Tabs
            value={match?.params?.tab || "deaths"}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Deaths" value={"deaths"} />
            <Tab label="Activity" value={"activity"} />
            <Tab label="Experience" value={"experience"} />
          </Tabs>
        </div>

        <Outlet />
      </GuildWrapper>
    </Layout>
  );
};

export default Guild;
