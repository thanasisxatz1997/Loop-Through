import Heading from "../styles/Heading";
import { useNavigate } from "react-router-dom";
import StyledSidebarLessonItem from "../styles/StyledSidebarLessonItem";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { useContext } from "react";

function SidebarCreateLessonItem() {
  const { setLessons } = useContext(CourseContext);
  const navigate = useNavigate();
  return (
    // <Link to={`${lesson.courseId}?lesson=${lesson.id}`} replace={true}>
    <StyledSidebarLessonItem
      onClick={() => {
        console.log("New lesson created");
        navigate(`/course/:12`, {
          replace: true,
        });
      }}
    >
      <HiMiniPlusCircle size={30}></HiMiniPlusCircle>
      <Heading as="h3">New lesson.</Heading>
    </StyledSidebarLessonItem>
    // </Link>
  );
}

export default SidebarCreateLessonItem;
