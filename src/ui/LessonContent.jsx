import StyledLessonContent from "../styles/StyledLessonContent";
import LessonTitle from "./LessonTitle";
import Row from "../styles/Row";
import LessonQuizesContainer from "../ui/LessonQuizesContainer";
import LessonElement from "../services/LessonElement";
import {
  lessonContentElements,
  lessonQuizes,
} from "../fakeAPI/fakeLessonContent";
function LessonContent({ id }) {
  const tempLessonContentElements = lessonContentElements;
  const tempQuizes = lessonQuizes;

  return (
    <Row type="vertical">
      <LessonTitle title={`This is lesson number ${id}`}></LessonTitle>
      <StyledLessonContent>
        {tempLessonContentElements.map((element) => (
          <LessonElement key={element.id} element={element}></LessonElement>
        ))}
      </StyledLessonContent>
      <LessonQuizesContainer quizes={tempQuizes}></LessonQuizesContainer>
    </Row>
  );
}

export default LessonContent;
