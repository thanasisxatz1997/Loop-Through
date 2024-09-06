import styled, { css } from "styled-components";

const StyledFormTextArea = styled.textarea`
  margin-top: 1rem;
  padding: 2px;
  font-size: large;
  border: solid 1px;
  width: 100%;
  resize: none;
  border-radius: 5px;
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}
  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `}
`;

export default StyledFormTextArea;
