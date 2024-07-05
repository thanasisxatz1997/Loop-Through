import Heading from "../styles/Heading";
import { useNavigate } from "react-router-dom";
import StyledSidebarLessonItem from "../styles/StyledSidebarLessonItem";

function SidebarLessonItem({ lesson, active }) {
  console.log("lesson is : ", lesson);
  const navigate = useNavigate();
  console.log("Lesson here: ", lesson);
  console.log("Is active?", active);
  return (
    // <Link to={`${lesson.courseId}?lesson=${lesson.id}`} replace={true}>
    <StyledSidebarLessonItem
      active={active}
      onClick={() =>
        active === "false"
          ? navigate(`/course/:${lesson.courseId}?lesson=${lesson.id}`, {
              replace: true,
            })
          : navigate(`/course/:${lesson.courseId}`, {
              replace: true,
            })
      }
    >
      <Heading as="h3">{lesson?.name ? lesson.name : "no title"}</Heading>
    </StyledSidebarLessonItem>
    // </Link>
  );
}

export default SidebarLessonItem;
