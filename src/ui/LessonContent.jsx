import Heading from "../styles/Heading";
import StyledLessonContent from "../styles/StyledLessonContent";
import LessonTitle from "./LessonTitle";
import Row from "../styles/Row";
import LessonQuizesContainer from "../ui/LessonQuizesContainer";
function LessonContent({ id }) {
  const lessonContentElements = [
    { type: "t", content: "This is a title" },
    { type: "p", content: "This is a paragraph" },
    { type: "p", content: "This is another paragraph" },
    { type: "t", content: "This is another title" },
    {
      type: "i",
      content: "",
      sizeX: "auto",
      sizeY: "auto",
    },
    { type: "t", content: "God damn it im good at this" },
  ];
  const tempQuizes = [
    { title: "quiz1" },
    { title: "quiz1" },
    { title: "quiz3" },
    { title: "quiz4" },
  ];
  function mapElement(element) {
    const type = element.type;
    const content = element.content;
    switch (type) {
      case "p":
        return <p style={{ textAlign: "center" }}>{content}</p>;
      case "t":
        return (
          <Heading as="h3" style={{ textAlign: "center" }}>
            {content}
          </Heading>
        );
      case "i":
        return (
          <img
            src={content}
            alt="Not found"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: element.sizeX,
              height: element.sizeY,
              objectFit: "contain",
            }}
          ></img>
        );
      default:
        return <Heading as="h3">Error</Heading>;
    }
  }
  return (
    <Row type="vertical">
      <LessonTitle title={`This is lesson number ${id}`}></LessonTitle>
      <StyledLessonContent>
        {lessonContentElements.map((element) => mapElement(element))}
      </StyledLessonContent>
      <LessonQuizesContainer quizes={tempQuizes}></LessonQuizesContainer>
    </Row>
  );
}

export default LessonContent;
