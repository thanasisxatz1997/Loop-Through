import StyledLessonContent from "../styles/StyledLessonContent";
import LessonTitle from "./LessonTitle";
import Row from "../styles/Row";
import LessonQuizesContainer from "../ui/LessonQuizesContainer";
import LessonElement from "../services/LessonElement";
function LessonContent({ id }) {
  const lessonContentElements = [
    { id: 1, type: "t", content: "This is a title", size: "1" },
    { id: 2, type: "p", content: "This is a paragraph" },
    { id: 3, type: "p", content: "This is another paragraph" },
    { id: 4, type: "t", content: "This is another title" },
    {
      id: 5,
      type: "i",
      content: "",
      sizeX: "auto",
      sizeY: "auto",
    },
    { id: 6, type: "t", content: "God damn it im good at this" },
  ];
  const tempQuizes = [
    { title: "quiz1" },
    { title: "quiz2" },
    { title: "quiz3" },
    { title: "quiz4" },
  ];

  return (
    <Row type="vertical">
      <LessonTitle title={`This is lesson number ${id}`}></LessonTitle>
      <StyledLessonContent>
        {lessonContentElements.map((element) => (
          <LessonElement key={element.id} element={element}></LessonElement>
        ))}
      </StyledLessonContent>
      <LessonQuizesContainer quizes={tempQuizes}></LessonQuizesContainer>
    </Row>
  );
}

export default LessonContent;
