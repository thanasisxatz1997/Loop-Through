import { Link, useNavigate } from "react-router-dom";
import Heading from "../styles/Heading";
import Row from "../styles/Row";
import StyledButton from "../styles/StyledButton";
import { HiOutlinePaperAirplane } from "react-icons/hi2";

function LessonElement({ element }) {
  const type = element.type;
  const content = element.content;
  const navigate = useNavigate();
  switch (type) {
    case "p":
      return (
        <p
          style={{
            textAlign: element.textAlign ? element.textAlign : "",
            whiteSpace: "pre-wrap",
            fontSize: element.size ? element.size : "15px",
            backgroundColor: element.backgroundColor
              ? element.backgroundColor
              : "",
          }}
        >
          {content}
        </p>
      );
    case "t":
      return (
        <Heading
          as={element.size}
          textalign={element.textAlign ? element.textAlign : "center"}
          style={{ textalign: "center" }}
        >
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
    case "quizLink":
      return (
        <Row content="center">
          <StyledButton onClick={() => navigate(`/quiz/${element.quizId}`)}>
            <Row gap="5px">
              {element.quizName}
              <HiOutlinePaperAirplane size={23}></HiOutlinePaperAirplane>
            </Row>
          </StyledButton>
        </Row>
      );
    default:
      return <Heading as="h3">Error</Heading>;
  }
}

export default LessonElement;
