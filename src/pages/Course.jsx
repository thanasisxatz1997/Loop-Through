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
import { createContext, useContext, useEffect, useState } from "react";
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
import { useUserCourseRatings } from "../features/courses/useUserCourseRatings";
import { useUser } from "../features/authentication/useUser";
import { useRateCourse } from "../features/courses/useRateCourse";
import { useCourses } from "../features/courses/useCourses";
import supabase from "../services/supabase";
import Button from "../styles/StyledButton";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import ChatWindow from "../features/chat/ChatWindow";
import { useUserData } from "../hooks/user/useUserData";
import { useEditLesson } from "../features/lessons/useEditLesson";

const StyledCourseContainer = styled.div`
  display: grid;
  height: 92vh;

  grid-template-rows: auto 1fr;
  grid-template-columns: 26rem 1fr;
  /* grid-row: 1; */
`;
const LessonContainer = styled.div`
  padding: 3rem;
  height: 92vh;
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

const TextSidebar = styled.div`
  padding-bottom: 10px;
  height: auto;
  position: fixed;
  /* margin: 10px; */
  right: 0px;
  width: auto;
  border-left: solid 1px black;
  border-bottom: solid 1px black;
  background-color: var(--color-brand-100);
  border-radius: 0 0 0 5%;
  box-shadow: -1px 3px 5px 1px var(--color-grey-700);
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    /* Transparent white overlay */
      url("/BLUE_GEOMETRIC_FLAT_LIQUID_BACKGROUND_generated.jpg");
  background-size: cover; /* Ensures the image covers the div */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents tiling */

  transform: translateX(24rem);
  transition: transform 600ms;
`;

export const CourseContext = createContext();

function Course() {
  const [isShowingChat, setIsShowingChat] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
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

  const params = useParams();
  const courseId = params.id.slice(1);
  const activeLessonId = useActiveLessonParams();
  const hasActiveLesson = activeLessonId !== 0 && activeLessonId !== null;
  const navigate = useNavigate();
  const { user } = useUser();
  const { rateCourse, isRatingCourse } = useRateCourse();
  const { userCourseRatings, isPending } = useUserCourseRatings(user.id);
  const courseRatings = userCourseRatings?.courseRatings;
  const currentRating = courseRatings?.find(
    (rating) => rating.courseId === courseId
  )?.rating;
  const { userData, isLoadingUserData } = useUserData(user?.id);
  const { courses, isLoadingCourses } = useCourses();
  const [editLesson, isEditing] = useEditLesson();

  const course = courses?.find((course) => course.id === courseId);
  const {
    isLoading,
    data: lessons,
    error,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: () => getLessonsByCourseId(courseId),
  });

  const editable =
    course?.authorId === user?.id ||
    userData?.roles.includes("admin") ||
    userData?.roles?.some((role) => course?.editableBy?.includes(role));

  function handleRateCourse(rating) {
    const courseRating = {
      courseId: courseId,
      rating: rating,
    };
    rateCourse(courseRating);
  }

  function handleCloseChat() {
    setIsShowingChat(false);
  }

  function handleShowChat() {
    if (firstRender) {
      setFirstRender(false);
    }
    setIsShowingChat(!isShowingChat);
  }
  const sortedLessons = lessons?.sort(
    (a, b) => a.lessonNumber - b.lessonNumber
  );
  console.log(sortedLessons);
  function handleMoveLessonElementAbove(lessonNumber) {
    if (lessonNumber === 1) {
      return;
    } else {
      const aboveLesson = lessons.find(
        (lesson) => lesson.lessonNumber + 1 === lessonNumber
      );
      editLesson({
        ...aboveLesson,
        lessonNumber: aboveLesson.lessonNumber + 1,
      });
      console.log("Above Lesson: ", {
        ...aboveLesson,
        lessonNumber: aboveLesson.lessonNumber + 1,
      });
      const belowLesson = lessons.find(
        (lesson) => lesson.lessonNumber === lessonNumber
      );
      editLesson({ ...belowLesson, lessonNumber: lessonNumber - 1 });
      console.log("Below Lesson: ", {
        ...belowLesson,
        lessonNumber: lessonNumber - 1,
      });
    }
  }
  function handleMoveLessonElementBelow(lessonNumber) {
    if (lessonNumber === lessons.length) {
      return;
    } else {
      const aboveLesson = lessons.find(
        (lesson) => lesson.lessonNumber === lessonNumber
      );
      console.log("new above: ", {
        ...aboveLesson,
        lessonNumber: aboveLesson.lessonNumber + 1,
      });
      editLesson({
        ...aboveLesson,
        lessonNumber: aboveLesson.lessonNumber + 1,
      });
      const belowLesson = lessons.find(
        (lesson) => lesson.lessonNumber - 1 === lessonNumber
      );
      console.log("new below: ", {
        ...belowLesson,
        lessonNumber: belowLesson.lessonNumber - 1,
      });
      editLesson({
        ...belowLesson,
        lessonNumber: belowLesson.lessonNumber - 1,
      });
    }
  }

  if (isLoading || isLoadingCourses) return <Spinner></Spinner>;
  if (error) console.log(error);
  if (courseId === ":-1") return <CourseCreate></CourseCreate>;
  const activeLesson = lessons?.filter(
    (lesson) => lesson.id === activeLessonId
  )[0];

  return (
    // <CourseContext.Provider value={{ lessons, courseId }}>
    <StyledCourseContainer>
      <Modal>
        <LessonSidebar>
          <Heading userselect="false" textalign="center">
            {course.name}
          </Heading>
          <hr></hr>
          <Heading as={"h3"} textalign="left" userselect="false">
            Lessons:
          </Heading>
          {lessons.map((lesson) => (
            <SidebarLessonItem
              key={lesson.id}
              lesson={lesson}
              active={lesson.id === activeLessonId ? "true" : "false"}
              editable={editable}
              handleMoveLessonElementAbove={handleMoveLessonElementAbove}
              handleMoveLessonElementBelow={handleMoveLessonElementBelow}
            ></SidebarLessonItem>
          ))}

          {editable && (
            <>
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
              <Modal.Window name="chatWindow">
                <ChatWindow chatName={courseId}></ChatWindow>
              </Modal.Window>
            </>
          )}

          <Row type="vertical" content="end">
            <RatingContainer>
              <Heading as="h3">Rate this course!</Heading>
              <StarRating
                defaultRating={currentRating}
                size={30}
                color="var(--color-grey-900)"
                onSetRating={handleRateCourse}
              ></StarRating>
            </RatingContainer>
          </Row>
          <Row content="center">
            {/* <Modal.Open opens="chatWindow"> */}
            <Button onClick={() => handleShowChat()}>
              <Row gap="5px">
                <div>Chat</div>
                <HiChatBubbleLeftRight></HiChatBubbleLeftRight>
              </Row>
            </Button>
            {/* </Modal.Open> */}
          </Row>
        </LessonSidebar>
        <LessonContainer>
          {hasActiveLesson ? (
            <LessonContent
              lesson={activeLesson}
              editable={editable}
            ></LessonContent>
          ) : (
            "There is no active lesson"
          )}
        </LessonContainer>
      </Modal>

      <TextSidebar
        style={{ display: `${firstRender ? "none" : "block"}` }}
        className={isShowingChat ? "slide-in-tr" : "slide-out-tr"}
      >
        <ChatWindow
          chatName={courseId}
          displayedName={course.name}
          handleClose={handleCloseChat}
        ></ChatWindow>
      </TextSidebar>
    </StyledCourseContainer>
    // </CourseContext.Provider>
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
