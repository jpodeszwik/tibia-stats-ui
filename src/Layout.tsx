import { ReactElement } from "react";
import styled from "styled-components";
import SearchGuild from "./SearchGuild";
import { useParams } from "react-router";

const LayoutWrapper = styled.div`
  padding: 16px;
  dislay: flex;
  flex-direction: column;
  gap: 16px
`;

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  const { guildName } = useParams();
  return (
    <LayoutWrapper>
      <SearchGuild guild={guildName} />
      <div>{children}</div>
    </LayoutWrapper>
  );
};

export default Layout;
