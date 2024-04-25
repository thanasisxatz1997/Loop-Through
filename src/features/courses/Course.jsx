import styled from "styled-components";
import Sidebar from "../../ui/Sidebar";

const StyledCourseContainer = styled.div`
  background-color: var(--bg-color-light-0);

  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;
  grid-template-columns: 26rem 1fr;
`;
const StyledCourseMain = styled.main`
  padding: 3rem;
`;

function Course() {
  return (
    <StyledCourseContainer>
      <Sidebar></Sidebar>
      <StyledCourseMain></StyledCourseMain>
    </StyledCourseContainer>
  );
}

export default Course;
