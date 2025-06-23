import Heading from "../styles/Heading";
import { useNavigate } from "react-router-dom";
import StyledSidebarLessonItem from "../styles/StyledSidebarLessonItem";
import Menus from "./Menus";
import { Tooltip } from "react-tooltip";

function SidebarLessonItem({ lesson, active }) {
  const navigate = useNavigate();
  return (
    // <Link to={`${lesson.courseId}?lesson=${lesson.id}`} replace={true}>
    <>
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
        data-tooltip-id={`${lesson?.name}-tooltip`}
      >
        <Heading
          as="h3"
          textalign="center"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          {lesson?.name ? lesson.name : "no title"}
        </Heading>
      </StyledSidebarLessonItem>
      <Tooltip id={`${lesson?.name}-tooltip`} place="top">
        {lesson?.name ? lesson.name : "no title"}
      </Tooltip>
    </>

    // </Link>
  );
}

export default SidebarLessonItem;
