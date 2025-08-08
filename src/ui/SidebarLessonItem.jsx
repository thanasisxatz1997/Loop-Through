import Heading from "../styles/Heading";
import { useNavigate } from "react-router-dom";
import StyledSidebarLessonItem from "../styles/StyledSidebarLessonItem";
import Menus from "./Menus";
import { Tooltip } from "react-tooltip";
import Row from "../styles/Row";
import Button from "../styles/StyledButton";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

function SidebarLessonItem({
  lesson,
  active,
  editable,
  handleMoveLessonElementAbove,
  handleMoveLessonElementBelow,
}) {
  const navigate = useNavigate();
  function onMoveLessonUpButtonClick(lessonNumber) {
    console.log("moving up");
    handleMoveLessonElementAbove(lessonNumber);
  }
  function onMoveLessonDownButtonClick(lessonNumber) {
    console.log("moving down");
    handleMoveLessonElementBelow(lessonNumber);
  }
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
        {editable && (
          <Row gap="0.5rem" className="moveLessonButtonRow">
            <Button
              style={{ padding: "2px" }}
              onClick={(e) => {
                e.preventDefault();
                onMoveLessonUpButtonClick(lesson.lessonNumber);
              }}
            >
              <HiChevronUp size={20}></HiChevronUp>
            </Button>
            <Button
              style={{ padding: "2px" }}
              onClick={(e) => {
                e.preventDefault();
                onMoveLessonDownButtonClick(lesson.lessonNumber);
              }}
            >
              <HiChevronDown size={20}></HiChevronDown>
            </Button>
          </Row>
        )}
      </StyledSidebarLessonItem>
      <Tooltip id={`${lesson?.name}-tooltip`} place="top">
        {lesson?.name ? lesson.name : "no title"}
      </Tooltip>
    </>

    // </Link>
  );
}

export default SidebarLessonItem;
