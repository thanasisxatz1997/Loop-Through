import styled from "styled-components";
import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

const StyledQuestionContainer = styled.div`
  align-self: center;
`;

function Question() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);
  return (
    <StyledQuestionContainer>
      <h4>{question.question}</h4>
      <Options question={question} />
    </StyledQuestionContainer>
  );
}

export default Question;
