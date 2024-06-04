import styled from "styled-components";
import LessonSidebar from "../../ui/LessonSidebar";
import SidebarLessonItem from "../../ui/SidebarLessonItem";
import Row from "../../styles/Row";
import StarRating from "../../ui/StarRating";
import Heading from "../../styles/Heading";
import LessonContent from "../../ui/LessonContent";
import { useActiveLessonParams } from "../../hooks/useActiveLessonParams";

const StyledCourseContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;
  grid-template-columns: 26rem 1fr;
  /* grid-row: 1; */
`;
const LessonContainer = styled.div`
  padding: 3rem;
  height: 100vh;
`;

const RatingContainer = styled.div`
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-items: center;
  text-align: center;
  margin-top: 3rem;
  /* width: 100%; */
`;

function CourseCreatePage() {
  const lessons = [];

  const activeLessonId = useActiveLessonParams();
  const hasActiveLesson = activeLessonId !== 0 && activeLessonId !== null;
  return (
    <StyledCourseContainer>
      <LessonSidebar>
        {lessons.map((lesson) => (
          <SidebarLessonItem
            key={lesson.id}
            lesson={lesson}
            active={lesson.id === activeLessonId ? "true" : "false"}
          ></SidebarLessonItem>
        ))}
        <Row type="vertical" content="end">
          <RatingContainer>
            <Heading as="h3">Rate this course!</Heading>
            <StarRating size="30" color="var(--color-grey-900)"></StarRating>
          </RatingContainer>
        </Row>
      </LessonSidebar>
      <LessonContainer>
        {hasActiveLesson ? (
          <LessonContent id={activeLessonId}></LessonContent>
        ) : (
          "There is no active lesson"
        )}
      </LessonContainer>
    </StyledCourseContainer>
  );
}

export default CourseCreatePage;
