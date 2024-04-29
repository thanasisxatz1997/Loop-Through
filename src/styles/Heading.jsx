import styled from "styled-components";
import { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.userselect === "false" &&
    css`
      user-select: none;
    `}
    ${(props) =>
    props.textAlign === "center" &&
    css`
      text-align: center;
    `}
`;

Heading.defaultProps = {
  userselect: "true",
  textAlign: "",
};

export default Heading;
