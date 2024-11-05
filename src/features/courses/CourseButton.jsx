import StyledCourseButton from "../../styles/StyledCourseButton";

import Heading from "../../styles/Heading";

import Row from "../../styles/Row";

import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledTitleContainer = styled.div`
  h2 {
    /* white-space: nowrap; */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  min-height: 60px;
  max-height: 60px;
  box-sizing: border-box;
  overflow: hidden;
`;

const StyledDescContainer = styled.div`
  h2 {
    /* white-space: nowrap; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
  }
  max-height: 150px;
  min-height: 150px;
  box-sizing: border-box;
  overflow: hidden;
`;

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
  const contents = (
    <Row type="vertical">
      <StyledTitleContainer>
        <Heading as="h2">{title}</Heading>
      </StyledTitleContainer>
      <StyledDescContainer>
        <Row padding="0rem 0.5rem">
          <p>{description}</p>
        </Row>
      </StyledDescContainer>
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
  );
  if (preview === true) {
    return (
      <StyledCourseButton backgroundimage={hasImage ? image : "none"} disabled>
        {contents}
        {/* <Row type="vertical">
          <StyledTitleContainer>
            <Heading as="h2">{title}</Heading>
          </StyledTitleContainer>
          <StyledDescContainer>
            <Row padding="0.1rem">
              <p>{description}</p>
            </Row>
          </StyledDescContainer>
          <hr></hr>
          <p
            style={{
              fontSize: "12px",
            }}
            as="h3"
          >
            {author}
          </p>
        </Row> */}
      </StyledCourseButton>
    );
  }
  return (
    <StyledCourseButton backgroundimage={hasImage ? image : "none"}>
      <Link to={`/course/:${id}`}>
        {contents}
        {/* <Row type="vertical">
          <StyledTitleContainer>
            <Heading as="h2">{title}</Heading>
          </StyledTitleContainer>
          <StyledDescContainer>
            <Row padding="0rem 0.5rem">
              <p>{description}</p>
            </Row>
          </StyledDescContainer>
          <hr></hr>
          <p
            style={{
              fontSize: "12px",
            }}
            as="h3"
          >
            {author}
          </p>
        </Row> */}
      </Link>
    </StyledCourseButton>
  );
}

export default CourseButton;
