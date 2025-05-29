import { useState } from "react";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import StyledAdminPanelContainer from "../../styles/StyledAdminPanelContainer";
import SearchBar from "../../ui/SearchBar";
import Spinner from "../../ui/Spinner";
import { useCourses } from "../courses/useCourses";
import Button from "../../styles/StyledButton";
import { HiMiniTrash, HiPencilSquare } from "react-icons/hi2";
import ToggleSwitch from "../../ui/ToggleSwitch";

function AdminCoursesPanel() {
  const [searchedText, setSearchedText] = useState("");
  const { courses, isLoadingCourses, error } = useCourses();

  const displayedCourses = getFilteredCourses();

  function getFilteredCourses() {
    if (!courses) return [];

    if (searchedText) {
      return courses?.filter((course) =>
        course.name
          .toLocaleLowerCase()
          .includes(searchedText.toLocaleLowerCase())
      );
    } else {
      return courses;
    }
  }

  if (isLoadingCourses) return <Spinner></Spinner>;
  if (error) return <div>Error</div>;
  return (
    <StyledAdminPanelContainer>
      <Row type="vertical">
        <Heading as="h2">Courses</Heading>
        <Row content="start" gap="1rem" style={{ alignItems: "center" }}>
          <Heading as="h5">Total: {courses.length}</Heading>
          <SearchBar
            placeholder="Search courses"
            searchText={searchedText}
            setSearchText={setSearchedText}
          ></SearchBar>
        </Row>
        {displayedCourses?.map((course) => (
          <Row type="vertical" key={course.id} gap="1px">
            <Row gap="1rem">
              <Heading as="h4">{course.name}</Heading>
              <Row gap="2rem">
                <Row gap="1rem">
                  <Heading as="h4">Visible:</Heading>
                  <ToggleSwitch></ToggleSwitch>
                </Row>
                <Button variation="primary" size="small">
                  <Row gap="5px">
                    Edit
                    <HiPencilSquare size={15}></HiPencilSquare>
                  </Row>
                </Button>
                <Button variation="danger" size="small">
                  <Row gap="5px">
                    Delete
                    <HiMiniTrash size={15}></HiMiniTrash>
                  </Row>
                </Button>
              </Row>
            </Row>
            <hr></hr>
          </Row>
        ))}
      </Row>
    </StyledAdminPanelContainer>
  );
}

export default AdminCoursesPanel;
