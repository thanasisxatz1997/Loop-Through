import styled, { css } from "styled-components";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  /* padding: 3.2rem 2.4rem; */
  border-right: 1px solid var(--color-grey-400);
  //The below line expands the component from the first row to the last one (so it takes all the rows)
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  /* gap: 3.2rem; */
  ${(props) => css`
    padding: ${props.padding};
    gap: ${props.gap};
  `}
  box-shadow: 0px 4px 3px 1px var(--color-grey-700);
  /* box-shadow: 12px 0px 15px -5px var(--color-grey-700); */
  position: relative;
`;

StyledSidebar.defaultProps = {
  padding: "1.5rem 0.5rem",
  gap: "3.2rem",
};

export default StyledSidebar;
// 10px 0px 15px -5px rgba(0, 0, 0, 0.3);
