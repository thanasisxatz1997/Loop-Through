import styled from "styled-components";
import { css } from "styled-components";
const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: ${props.content};
      align-items: center;
      gap: ${props.gap};
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
    ${(props) =>
    props.padding !== "" &&
    css`
      padding: ${props.padding};
    `}
    ${(props) =>
    props.margin !== "" &&
    css`
      margin: ${props.margin};
    `}
    ${(props) =>
    props.gap !== "" &&
    css`
      gap: ${props.gap};
    `}
`;

Row.defaultProps = {
  type: "horizontal",
  content: "space-between",
  gap: "",
  padding: "",
  margin: "",
};

export default Row;
