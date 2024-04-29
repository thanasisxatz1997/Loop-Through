import styled from "styled-components";
import { useQuiz } from "../contexts/QuizContext";

const StyledProgressHeader = styled.header`
  margin: 2rem 15%;
  margin-bottom: 4rem;
  display: grid;
  justify-content: space-between;
  gap: 1.2rem;
  grid-template-columns: auto auto;
  font-size: 1.8rem;
  color: var(--color-medium);
`;

const StyledProgress = styled.progress`
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  grid-column: 1 / -1;

  &::-webkit-progress-bar {
    background-color: var(--color-medium);
    border-radius: 100px;
  }
  &::-webkit-progress-value {
    background-color: var(--color-theme);
    border-radius: 100px;
  }
`;

function Progress() {
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();
  return (
    <StyledProgressHeader className="progress">
      <StyledProgress
        max={numQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Question
        <strong>{index + Number(answer !== null)}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </StyledProgressHeader>
  );
}

export default Progress;
