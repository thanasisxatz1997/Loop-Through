import { Outlet } from "react-router";
import styled from "styled-components";
import Header from "./Header";

const StyledAppLayout = styled.div`
  grid-template-rows: auto 1fr;
  height: 100vh;
  display: grid;
`;

const Main = styled.main`
  padding: 4rem 4.8rem 6.4;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Outlet></Outlet>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
