import styled, { css } from "styled-components";

const StyledToggleSwitch = styled.label`
  position: relative;
  display: block;
  width: 42px;
  height: 24px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);

  input[type="checkbox"] {
    visibility: hidden;
    display: none;
  }

  /* Background bar */
  .background {
    position: relative;
    top: 1px;
    left: 1px;
    width: 40px;
    height: 22px;
    display: block;
    background: #c8ccd4;
    border-radius: 12px;
    transition: background 0.2s ease;

    ${(props) =>
      props.checked &&
      css`
        background: #1175c7;
      `}
  }

  /* Slider circle */
  .circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    display: block;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(154, 153, 153, 0.75);
    transition: all 0.2s ease;

    ${(props) =>
      props.checked &&
      css`
        transform: translateX(18px);
      `}
  }
`;

export default StyledToggleSwitch;
