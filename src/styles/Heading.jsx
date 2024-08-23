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
    css`
      text-align: ${props.textalign};
    `}
`;

Heading.defaultProps = {
  userselect: "true",
  textalign: "",
};

export default Heading;
