import { useParams } from "react-router";
import styled from "styled-components";
import LessonSidebar from "../ui/LessonSidebar";
import SidebarLessonItem from "../ui/SidebarLessonItem";
import { useActiveLessonParams } from "../hooks/useActiveLessonParams";
import LessonContent from "../ui/LessonContent";

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

function Course() {
  const lessons = [
    { id: 1, courseId: 1, title: "First lesson!" },
    { id: 2, courseId: 1, title: "Second lesson!" },
    { id: 3, courseId: 1, title: "Third lesson!" },
    { id: 4, courseId: 1, title: "Fourth lesson!" },
  ];
  const params = useParams();
  const courseId = params.id;
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

export default Course;
