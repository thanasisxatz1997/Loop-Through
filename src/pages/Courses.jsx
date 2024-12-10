import styled from "styled-components";
import Sidebar from "../ui/Sidebar";
import CourseButton from "../features/courses/CourseButton";
import StyledButton from "../styles/StyledButton";
import CreateCourseButton from "../features/courses/CreateCourseButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCourse, getCourses } from "../services/apiCourses";
import Spinner from "../ui/Spinner";
import Modal from "../ui/Modal";
import CreateLessonForm from "../features/courses/CreateLessonForm";
import CreateCourseForm from "../features/courses/CreateCourseForm";
const StyledCoursesContainer = styled.div`
  /* background: radial-gradient(
    circle,
    #7ca3d68a 0%,
    #7ca3d68a 50%,
    #87a4c98a 100%
  ); */
  background-color: var(--bg-color-light-0);

  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;
  grid-template-columns: 26rem 1fr;
  /* grid-row: 1; */
`;

const StyledCoursesMainContainer = styled.main`
  display: grid;
  padding: 3rem;
  gap: 2rem;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  justify-items: center;
  align-items: center;
  grid-auto-rows: 300px;
  grid-auto-columns: 300px;
`;

const testCourses = [
  {
    id: 1,
    title: "react",
    description: "A good React course!",
    author: "Thanasis Chatziathanasiou",
    image:
      "https://assets.leetcode.com/explore/cards/top-151-interview-questions/img",
  },
  {
    id: 2,
    title: "Html",
    description: "A good html course!",
    author: "Thanasis Chatziathanasiou",
    image:
      "https://assets.leetcode.com/explore/cards/leetcodes-interview-crash-course-data-structures-and-algorithms/img-1663091244.png",
  },
];

function Courses() {
  const queryClient = useQueryClient();

  const { mutate: createNewCourse, isLoading: isCreatingCourse } = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success("New course successfully created.");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const {
    isLoading,
    data: courses,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  if (isLoading) return <Spinner></Spinner>;
  return (
    <StyledCoursesContainer>
      <Sidebar></Sidebar>
      <StyledCoursesMainContainer>
        {courses.map((course) => (
          <CourseButton
            key={course.id}
            id={course.id}
            title={course.name}
            description={course.description}
            author={course.authorName}
            image={course.image.replace(/ /g, "%20")}
          ></CourseButton>
        ))}
        <Modal>
          <Modal.Open opens="newCourseModal">
            <CreateCourseButton>Create a new Course!</CreateCourseButton>
          </Modal.Open>
          <Modal.Window name="newCourseModal">
            <CreateCourseForm createCourse={createNewCourse}></CreateCourseForm>
          </Modal.Window>
        </Modal>
      </StyledCoursesMainContainer>
    </StyledCoursesContainer>
  );
}

export default Courses;
