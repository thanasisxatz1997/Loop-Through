import StyledCourseButton from "../../styles/StyledCourseButton";

import Heading from "../../styles/Heading";

import Row from "../../styles/Row";

import { Link } from "react-router-dom";
import { PiHandbagSimple } from "react-icons/pi";

function CourseButton({
  id,
  title,
  description,
  author,
  image,
  preview = false,
}) {
  const hasImage = image !== "" && image;
  console.log("image: ", image);
  if (preview === true) {
    return (
      <StyledCourseButton backgroundimage={hasImage ? image : "none"} disabled>
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
      </StyledCourseButton>
    );
  }
  return (
    <StyledCourseButton backgroundimage={hasImage ? image : "none"}>
      <Link to={`/course/:${id}`}>
        <Row type="vertical">
          <Heading as="h2">{title}</Heading>
          <Row padding="0rem 0.5rem">
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
