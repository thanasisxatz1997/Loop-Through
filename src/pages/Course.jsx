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

function Course() {
  const lessons = [
    { id: 1, courseId: 1, title: "First lesson!" },
    { id: 2, courseId: 1, title: "Second lesson!" },
    { id: 3, courseId: 1, title: "Third lesson!" },
    { id: 4, courseId: 1, title: "Fourth lesson!" },
  ];
  const params = useParams();
  const courseId = params.id;
  console.log(`This is the course with id: ${courseId}`);
  const activeLessonId = useActiveLessonParams();
  const hasActiveLesson = activeLessonId !== 0 && activeLessonId !== null;
  console.log("lessonID: ", activeLessonId);
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
      {hasActiveLesson ? (
        <LessonContent id={activeLessonId}></LessonContent>
      ) : (
        "There is no active lesson"
      )}
    </StyledCourseContainer>
  );
}

export default Course;
