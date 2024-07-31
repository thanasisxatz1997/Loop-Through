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
import Modal from "../ui/Modal";
import CreateLessonForm from "../features/courses/CreateLessonForm";
import {
  createLesson,
  getLessonsByCourseId,
  getLessonById,
} from "../services/apiLessons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
import CreateCourseForm from "../features/courses/CreateCourseForm";

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

export const CourseContext = createContext();

function Course() {
  const queryClient = useQueryClient();
  const { mutate: createNewLesson, isLoading: isCreatingLesson } = useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      toast.success("New lesson successfully created.");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: getActiveLesson, isLoading: isGettingActiveLesson } =
    useMutation({
      mutationFn: getLessonById,
      onSuccess: () => {
        toast.success("Active lesson Loaded.");
        queryClient.invalidateQueries({ queryKey: ["activeLesson"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const editable = true;
  const params = useParams();
  const courseId = params.id.slice(1);
  console.log("courseId=", courseId);
  const activeLessonId = useActiveLessonParams();
  console.log("active lesson in course: ", activeLessonId);
  const hasActiveLesson = activeLessonId !== 0 && activeLessonId !== null;
  const navigate = useNavigate();
  const {
    isLoading,
    data: lessons,
    error,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: () => getLessonsByCourseId(courseId),
  });

  if (isLoading) return <Spinner></Spinner>;
  if (error) console.log(error);
  console.log("Done loading");
  console.log(lessons);
  if (courseId === ":-1") return <CourseCreate></CourseCreate>;
  console.log("Now lessons are: ", lessons);
  const activeLesson = lessons.filter(
    (lesson) => lesson.id === activeLessonId
  )[0];

  return (
    <CourseContext.Provider value={{ lessons, courseId }}>
      <StyledCourseContainer>
        <LessonSidebar>
          {lessons.map((lesson) => (
            <SidebarLessonItem
              key={lesson.id}
              lesson={lesson}
              active={lesson.id === activeLessonId ? "true" : "false"}
            ></SidebarLessonItem>
          ))}
          {editable && (
            <Modal>
              <Modal.Open opens="newLessonModal">
                <SidebarCreateLessonItem></SidebarCreateLessonItem>
              </Modal.Open>
              <Modal.Window name="newLessonModal">
                <CreateLessonForm
                  createLesson={createNewLesson}
                  courseId={courseId}
                  lessonNumber={lessons.length + 1}
                ></CreateLessonForm>
              </Modal.Window>
            </Modal>
          )}

          <Row type="vertical" content="end">
            <RatingContainer>
              <Heading as="h3">Rate this course!</Heading>
              <StarRating size={30} color="var(--color-grey-900)"></StarRating>
            </RatingContainer>
          </Row>
        </LessonSidebar>
        <LessonContainer>
          {hasActiveLesson ? (
            <LessonContent lesson={activeLesson}></LessonContent>
          ) : (
            "There is no active lesson"
          )}
        </LessonContainer>
      </StyledCourseContainer>
    </CourseContext.Provider>
  );
}

function SidebarCreateLessonItem({ onClick }) {
  return (
    <StyledSidebarLessonItem onClick={onClick}>
      <HiMiniPlusCircle size={30}></HiMiniPlusCircle>
      <Heading as="h3">New lesson.</Heading>
    </StyledSidebarLessonItem>
  );
}

export default Course;
