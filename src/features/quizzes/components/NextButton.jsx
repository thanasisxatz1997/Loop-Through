import styled from "styled-components";
import { useQuiz } from "../contexts/QuizContext";

const StyledNextButton = styled.button`
  /* background-color: var(--color-grey-400); */
`;

function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz();
  if (answer === null) return null;
  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
  if (index === numQuestions - 1) {
    return (
      <StyledNextButton
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </StyledNextButton>
    );
  }
}

export default NextButton;
