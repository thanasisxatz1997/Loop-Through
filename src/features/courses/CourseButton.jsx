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
  min-height: 30px;
  max-height: 30px;
  box-sizing: border-box;
  overflow: hidden;
`;

const StyledDescContainer = styled.div`
  h2 {
    /* white-space: nowrap; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
  }
  max-height: 130px;
  min-height: 130px;
  box-sizing: border-box;
  overflow: hidden;
`;
const StyledDesc = styled.p`
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
  ${StyledCourseButton}:hover & {
    visibility: visible;
    opacity: 1;
  }
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
  const contents = (
    <Row type="vertical">
      <StyledTitleContainer>
        <Heading
          as="h2"
          style={{
            // text-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
            // backgroundColor: "#0000006f",
            width: "80%",
            textAlign: "center",
            alignSelf: "center",
            justifySelf: "center",
            borderRadius: "10px",
            textShadow: "0 0 10px rgba(0, 0, 0, 0.6)",
          }}
        >
          {title}
        </Heading>
      </StyledTitleContainer>
      <StyledDescContainer>
        <Row padding="0rem 0.5rem">
          <StyledDesc
            style={{
              backgroundColor: "#0000006f",
              width: "100%",
              textAlign: "center",
              alignSelf: "center",
              justifySelf: "center",
              borderRadius: "10px",
            }}
          >
            {description}
          </StyledDesc>
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
