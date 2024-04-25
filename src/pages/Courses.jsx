import styled from "styled-components";
import Sidebar from "../ui/Sidebar";
import CourseButton from "../features/courses/CourseButton";

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
  return (
    <StyledCoursesContainer>
      <Sidebar></Sidebar>
      <StyledCoursesMainContainer>
        <CourseButton
          title={"React!"}
          description={"A good React course!"}
          author="Thanasis Chatziathanasiou"
        ></CourseButton>
        <CourseButton
          title={"Html!"}
          description={"A good html course!"}
          author="Thanasis Chatziathanasiou"
        ></CourseButton>
      </StyledCoursesMainContainer>
    </StyledCoursesContainer>
  );
}

export default Courses;
