import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import StyledCourseButton from "../../styles/StyledCourseButton";
import { HiMiniPlusCircle } from "react-icons/hi2";
function CreateCourseButton({ onClick }) {
  return (
    <StyledCourseButton onClick={onClick}>
      {/* <Link to={`/course/:-1`}> */}
      <Row type="vertical">
        <Heading as="h2">Create course!</Heading>
        <Row content="center">
          <HiMiniPlusCircle size={70}></HiMiniPlusCircle>
        </Row>
      </Row>
      {/* </Link> */}
    </StyledCourseButton>
  );
}

export default CreateCourseButton;
