import StyledCourseButton from "../../styles/StyledCourseButton";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
function CourseButton({ title, description, author }) {
  return (
    <StyledCourseButton>
      <Row type="vertical">
        <Heading as="h2">{title}</Heading>

        <p>{description}</p>
        <br></br>
        <hr></hr>
        <p
          style={{
            fontSize: "12px",
          }}
          as="h3"
        >
          {author}
        </p>
      </Row>
    </StyledCourseButton>
  );
}

export default CourseButton;
