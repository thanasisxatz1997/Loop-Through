import styled, { css } from "styled-components";

const TextModal = styled.div`
  border-radius: 10px;
  user-select: none;
  background-color: #dcd5d59a;
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
`;

TextModal.defaultProps = {
  width: "20vh",
  height: "20vh",
  margin: "5px",
  padding: "15px",
};

export default TextModal;
