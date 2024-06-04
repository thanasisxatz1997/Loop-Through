import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import LessonSidebar from "../ui/LessonSidebar";
import SidebarLessonItem from "../ui/SidebarLessonItem";
import { useActiveLessonParams } from "../hooks/useActiveLessonParams";
import LessonContent from "../ui/LessonContent";
import StarRating from "../ui/StarRating";
import Row from "../styles/Row";
import Heading from "../styles/Heading";
import CourseCreate from "../features/courses/CourseCreatePage";
import { createContext, useContext, useState } from "react";
import StyledSidebarLessonItem from "../styles/StyledSidebarLessonItem";
import { HiMiniPlusCircle } from "react-icons/hi2";

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

const CourseContext = createContext();

function Course() {
  const [lessons, setLessons] = useState([
    { id: 1, courseId: 1, title: "First lesson!" },
    { id: 2, courseId: 1, title: "Second lesson!" },
    { id: 3, courseId: 1, title: "Third lesson!" },
    { id: 4, courseId: 1, title: "Fourth lesson!" },
  ]);

  const editable = true;

  const params = useParams();
  const courseId = params.id;
  console.log("courseId: ", courseId);
  console.log(courseId === "-1");

  const activeLessonId = useActiveLessonParams();
  const hasActiveLesson = activeLessonId !== 0 && activeLessonId !== null;
  if (courseId === ":-1") return <CourseCreate></CourseCreate>;
  return (
    <CourseContext.Provider value={{ lessons, setLessons, courseId }}>
      <StyledCourseContainer>
        <LessonSidebar>
          {lessons.map((lesson) => (
            <SidebarLessonItem
              key={lesson.id}
              lesson={lesson}
              active={lesson.id === activeLessonId ? "true" : "false"}
            ></SidebarLessonItem>
          ))}
          {editable && <SidebarCreateLessonItem></SidebarCreateLessonItem>}
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
    </CourseContext.Provider>
  );
}

function SidebarCreateLessonItem() {
  const { courseId, setLessons } = useContext(CourseContext);
  const navigate = useNavigate();
  const newLesson = { id: 5, courseId: 1, title: "Fifth lesson!" };
  function createLesson() {
    console.log("New lesson created");
    setLessons((lessons) => [
      ...lessons,
      { id: 5, courseId: 1, title: "Fifth lesson!" },
    ]);
    navigate(`/course/${courseId}?lesson=${newLesson.id}`, {
      replace: true,
    });
  }
  return (
    // <Link to={`${lesson.courseId}?lesson=${lesson.id}`} replace={true}>
    <StyledSidebarLessonItem
      onClick={() => {
        createLesson(newLesson);
      }}
    >
      <HiMiniPlusCircle size={30}></HiMiniPlusCircle>
      <Heading as="h3">New lesson.</Heading>
    </StyledSidebarLessonItem>
    // </Link>
  );
}

export default Course;
