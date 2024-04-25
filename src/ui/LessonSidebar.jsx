import StyledSidebar from "../styles/StyledSidebar";

function LessonSidebar({ children }) {
  return (
    <StyledSidebar gap="0.2rem" padding="0.5rem">
      {children}
    </StyledSidebar>
  );
}

export default LessonSidebar;
