import styled from "styled-components";
import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import { useState } from "react";
import AdminPanel from "../../pages/AdminPanel";

const StyledSidebarContainer = styled.div`
  border-radius: 10px;
  background-color: var(--color-grey-0);
  width: 15%; /* or whatever percentage you want */
  height: 100%;
  padding: 0.5;
  padding-top: 1rem;
  padding-bottom: 1rem;
  box-shadow: 5px 5px 12px 1px var(--color-grey-700);
`;

const SidebarItem = styled.div`
  padding-left: 5px;
  border-radius: 2px;
  border-left: solid 5px var(--color-grey-500);
  cursor: pointer;
  &:hover {
    border-left: solid 5px blue;
    background-color: var(--color-brand-50);
  }

  &.active {
    border-left: solid 5px var(--color-grey-500);
    background-color: var(--color-grey-200);
  }
`;

function AdminSidebarPanel({ tabs, selectedTab, setSelectedTab }) {
  return (
    <StyledSidebarContainer>
      <Row type="vertical" gap="0.1rem">
        {tabs.map((tab) => (
          <SidebarItem
            className={selectedTab === tab.key ? "active" : ""}
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
          >
            <Row
              content="start"
              style={{ alignItems: "center", minHeight: "40px" }}
            >
              <Heading as="h4">{tab.name}</Heading>
            </Row>
            <hr></hr>
          </SidebarItem>
        ))}
      </Row>
    </StyledSidebarContainer>
  );
}

export default AdminSidebarPanel;
