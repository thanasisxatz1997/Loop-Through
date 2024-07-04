import styled from "styled-components";
import Sidebar from "../ui/Sidebar";
import CourseButton from "../features/courses/CourseButton";
import StyledButton from "../styles/StyledButton";
import CreateCourseButton from "../features/courses/CreateCourseButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getCourses } from "../services/apiCourses";
import Spinner from "../ui/Spinner";
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
  grid-template-columns: repeat(3, 200px);
  justify-items: center;
  align-items: center;
  grid-auto-rows: 200px;
  grid-auto-columns: 200px;
`;

function Courses() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: courses,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

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
  if (isLoading) return <Spinner></Spinner>;
  else console.log("done loading");
  if (error) console.log(error);
  console.log(courses);
  const availableCourses = courses;
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
            image={course.image}
          ></CourseButton>
        ))}

        <CreateCourseButton>Create a new Course!</CreateCourseButton>
      </StyledCoursesMainContainer>
    </StyledCoursesContainer>
  );
}

export default Courses;
