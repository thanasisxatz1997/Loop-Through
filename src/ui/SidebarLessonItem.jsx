import Heading from "../styles/Heading";
import { useNavigate } from "react-router-dom";
import StyledSidebarLessonItem from "../styles/StyledSidebarLessonItem";
import Menus from "./Menus";

function SidebarLessonItem({ lesson, active }) {
  const navigate = useNavigate();
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
