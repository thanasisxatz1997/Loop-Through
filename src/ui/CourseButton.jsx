import StyledCourseButton from "../styles/StyledCourseButton";
import Heading from "../styles/Heading";
import Row from "../styles/Row";
import { Link } from "react-router-dom";
function CourseButton({ id, title, description, author }) {
  return (
    <StyledCourseButton>
      <Link to={`/course/:${id}`}>
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
      </Link>
    </StyledCourseButton>
  );
}

export default CourseButton;
