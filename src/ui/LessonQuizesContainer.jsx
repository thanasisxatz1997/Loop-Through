import StyledLessonQuizesContainer from "../styles/StyledLessonQuizesContainer";
import StyledButton from "../styles/StyledButton";
import Row from "../styles/Row";
function LessonQuizesContainer({ quizes }) {
  return (
    <StyledLessonQuizesContainer>
      <Row content="start" gap="1rem">
        {quizes.map((quiz) => (
          <StyledButton>{quiz.title}</StyledButton>
        ))}
      </Row>
    </StyledLessonQuizesContainer>
  );
}

export default LessonQuizesContainer;
