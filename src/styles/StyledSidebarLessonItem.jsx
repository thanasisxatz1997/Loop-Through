import styled, { css } from "styled-components";

const StyledSidebarLessonItem = styled.button`
  align-items: center;
  appearance: none;
  background-color: var(--color-blue-100);
  border-radius: 4px;
  border-width: 0;
  box-shadow: var(--color-grey-900) 0 2px 4px,
    var(--color-grey-900) 0 7px 13px -3px, var(--color-grey-300) 0 -3px 0 inset;
  box-sizing: border-box;
  color: var(--color-grey-900);
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  min-height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;

  ${(props) =>
    css`
      ${props.active === "true" &&
      `
          box-shadow: var(--color-grey-400) 0 3px 7px inset;
          transform: translateY(2px);
        `}
      ${props.active === "false" &&
      `
        &:focus {
          box-shadow: var(--color-grey-400) 0 0 0 1.5px inset, var(--color-grey-800) 0 2px 4px,
          var(--color-grey-800) 0 7px 13px -3px, var(--color-blue-700) 0 -3px 0 inset;
        }

        &:hover {
          box-shadow: var(--color-grey-800) 0 4px 8px,
          var(--color-grey-800) 0 7px 13px -3px, var(--color-blue-700) 0 -3px 0 inset;
          transform: translateY(-2px);
        }
      `}
    `}/* &:active {
    box-shadow: #d6d6e7 0 3px 7px inset;
    transform: translateY(2px);
  } */
`;
StyledSidebarLessonItem.defaultProps = {
  active: "false",
};

export default StyledSidebarLessonItem;
