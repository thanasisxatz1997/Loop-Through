import styled from "styled-components";
import Heading from "../styles/Heading";

const StyledSpan = styled.span`
  text-align: center;
`;
function LessonTitle({ title }) {
  return (
    <StyledSpan>
      <Heading as="h1">{title}</Heading>
    </StyledSpan>
  );
}

export default LessonTitle;
