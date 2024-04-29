import styled, { css } from "styled-components";
import StyledSearchInput from "../styles/StyledSearchInput";
import Row from "../styles/Row";
import { HiMagnifyingGlass } from "react-icons/hi2";
import QuizListItem from "../ui/QuizListItem";

const StyledQuizesContainer = styled.div`
  background-color: var(--bg-color-light-0);
  height: 100%;
`;

const StyledQuizesMainContainer = styled.main`
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const StyledQuizList = styled.ul`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: #ffffff59;
  min-width: 50rem;
  max-width: 50rem;
`;

const tempQuizes = [
  { title: "Quiz1" },
  { title: "Quiz2" },
  { title: "Quiz3" },
  { title: "Quiz4" },
];

function Quizes() {
  return (
    <StyledQuizesContainer>
      <StyledQuizesMainContainer>
        <Row content="center">
          <HiMagnifyingGlass size={20}></HiMagnifyingGlass>
          <StyledSearchInput></StyledSearchInput>
        </Row>
        <StyledQuizList>
          {tempQuizes.map((quiz, i) => (
            <QuizListItem
              title={quiz.title}
              delay={`0.${i * 3}s`}
            ></QuizListItem>
          ))}
        </StyledQuizList>
      </StyledQuizesMainContainer>
    </StyledQuizesContainer>
  );
}

export default Quizes;
