import styled, { css } from "styled-components";

const TextModal = styled.div`
  border-radius: 10px;
  user-select: none;
  background-color: var(--color-grey-0);
  white-space: normal;
  word-wrap: normal;
  font-weight: 600;
  font-size: large;
  ${(props) => css`
    width: ${props.width};
    height: ${props.height};
    margin: ${props.margin};
    padding: ${props.padding};
  `}
  animation: slide-top 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  @keyframes slide-top {
    0% {
      transform: translateY(200px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  ${(props) =>
    props.position === "absolute" &&
    css`
      position: absolute;
      top: ${props.top};
      right: ${props.right};
      left: ${props.left};
      bottom: ${props.bottom};
    `}
  @media only screen and (max-width: ${(props) => props.maxwidth}) {
    display: none;
  }
`;

TextModal.defaultProps = {
  maxwidth: "1320px",
  width: "20vh",
  height: "20vh",
  margin: "5px",
  padding: "15px",
  position: "",
  top: "0",
  right: "0",
  left: "0",
  bottom: "",
};

export default TextModal;
