import { Outlet } from "react-router";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  height: 100vh;
  display: grid;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <header>HEADER</header>
      <main>
        <Outlet></Outlet>
      </main>
    </StyledAppLayout>
  );
}

export default AppLayout;
