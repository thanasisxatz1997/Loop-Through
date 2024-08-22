import styled, { css } from "styled-components";

const StyledTabsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100px;
  width: 800px; */
  min-width: 60rem;
  position: relative;
  background: #eee;
  text-align: center;
  margin-top: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

const StyledTab = styled.div`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: #000;
  letter-spacing: 0.1rem;
  transition: all 0.5s ease;
  font-size: 1.5rem;
  padding-bottom: 6px;
  padding-left: 1rem;
  padding-right: 1rem;
  &:hover {
    color: white;
    background: rgba(102, 177, 241, 0.8);
    transition: all 0.5s ease;
  }
  border: none;
  ${(props) =>
    props.selected === true &&
    css`
      border-bottom: #66b1f1 6px solid;
      padding-bottom: 0px;
    `}
`;

StyledTab.defaultProps = {
  selected: false,
};

function SelectionHeader({ tabs, activeTabId, setActiveTabId }) {
  return (
    <StyledTabsSection>
      <TabsContainer>
        {tabs.map((tab) => (
          <StyledTab
            selected={tab.id === activeTabId ? true : false}
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.name}
          </StyledTab>
        ))}
      </TabsContainer>
    </StyledTabsSection>
  );
}

export default SelectionHeader;
