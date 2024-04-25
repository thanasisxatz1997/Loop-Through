import styled, { css } from "styled-components";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-100);
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
`;

StyledSidebar.defaultProps = {
  padding: "3.2rem 2.4rem",
  gap: "3.2rem",
};

export default StyledSidebar;
