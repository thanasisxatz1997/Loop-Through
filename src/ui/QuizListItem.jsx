import styled, { css } from "styled-components";
import Heading from "../styles/Heading";
import Row from "../styles/Row";
import StyledButton from "../styles/StyledButton";

const StyledQuizListItem = styled.li`
  background-color: var(--color-grey-100);
  border: solid 1px;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-color: var(--color-grey-400);
  ${(props) => css`
    animation: slide-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${props.delay}
      both;
  `}
  @keyframes slide-left {
    0% {
      display: none;
      transform: translateX(200px);
    }
    100% {
      display: block;
      transform: translateX(0px);
    }
  }
`;

function QuizListItem({ title, delay }) {
  return (
    <StyledQuizListItem delay={delay}>
      <Row content="space-between">
        <Heading as={"h3"}>{title}</Heading>
        <StyledButton size="small">start</StyledButton>
      </Row>
    </StyledQuizListItem>
  );
}

export default QuizListItem;