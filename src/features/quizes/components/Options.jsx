import styled from "styled-components";
import { useQuiz } from "../contexts/QuizContext";

const StyledOption = styled.button`
  border: solid 1px;
`;

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <StyledOption
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer &&
            (index === question.correctOption ? "correct" : "wrong")
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswer}
        >
          {option}
        </StyledOption>
      ))}
    </div>
  );
}

export default Options;
