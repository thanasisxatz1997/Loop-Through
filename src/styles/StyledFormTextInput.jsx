import styled, { css } from "styled-components";

const StyledFormTextInput = styled.input`
  padding: 2px;
  font-size: large;
  border: solid 1px;
  border-radius: 5px;
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}
`;

export default StyledFormTextInput;
