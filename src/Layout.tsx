import { ReactElement } from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  .banner {
    display: flex;
    justify-content: center;
    background-color: #282c34;
    color: #fff;
  }

  .content {
    padding: 16px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutWrapper>
      <div className="banner">
        <h1>Tibia Stats</h1>
      </div>
      <div className="content">{children}</div>
    </LayoutWrapper>
  );
};

export default Layout;
