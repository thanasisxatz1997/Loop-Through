import StyledCourseButton from "../../styles/StyledCourseButton";

import Heading from "../../styles/Heading";

import Row from "../../styles/Row";

import { Link } from "react-router-dom";
import { PiHandbagSimple } from "react-icons/pi";

function CourseButton({ id, title, description, author, image }) {
  const hasImage = image !== "" && image;
  return (
    <StyledCourseButton backgroundimage={hasImage ? image : "none"}>
      <Link to={`/course/:${id}`}>
        <Row type="vertical">
          <Heading as="h2">{title}</Heading>
          <Row padding="1rem">
            <p>{description}</p>
          </Row>

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
