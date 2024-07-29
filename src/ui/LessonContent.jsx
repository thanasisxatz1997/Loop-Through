import StyledLessonContent from "../styles/StyledLessonContent";
import LessonTitle from "./LessonTitle";
import Row from "../styles/Row";
import LessonQuizesContainer from "../ui/LessonQuizesContainer";
import LessonElement from "../services/LessonElement";
import { lessonQuizes } from "../fakeAPI/fakeLessonContent";

function LessonContent({ lesson }) {
  const activeContentElements = lesson.content;
  console.log("contentElems: ", activeContentElements);
  return (
    <Row type="vertical">
      <LessonTitle
        title={`This is lesson number ${lesson.lessonNumber}`}
      ></LessonTitle>
      <StyledLessonContent>
        {activeContentElements.map((element) => (
          <LessonElement key={element.id} element={element}></LessonElement>
        ))}
      </StyledLessonContent>
      <LessonQuizesContainer quizes={[]}></LessonQuizesContainer>
    </Row>
  );
}

export default LessonContent;
