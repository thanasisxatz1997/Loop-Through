import { useState } from "react";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import StyledAdminPanelContainer from "../../styles/StyledAdminPanelContainer";
import SearchBar from "../../ui/SearchBar";
import Spinner from "../../ui/Spinner";
import { useCourses } from "../courses/useCourses";
import Button from "../../styles/StyledButton";
import {
  HiMiniPencilSquare,
  HiMiniTrash,
  HiPencilSquare,
} from "react-icons/hi2";
import ToggleSwitch from "../../ui/ToggleSwitch";
import Modal from "../../ui/Modal";
import RollesAddForm from "../../ui/RolesAddForm";
import { updateCourseVisibleRoles } from "../../services/apiCourses";
import { useDeleteCourse } from "../courses/useDeleteCourse";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../../ui/DeleteConfirmation";

function AdminCoursesPanel({ settings }) {
  const [searchedText, setSearchedText] = useState("");
  const { courses, isLoadingCourses, error } = useCourses();

  const currentRoles = settings?.roles;

  const displayedCourses = getFilteredCourses();
  const { deleteCourse, isDeletingCourse } = useDeleteCourse();

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
      <Modal>
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
                    <ToggleSwitch
                      checked={true}
                      onChange={() => {}}
                    ></ToggleSwitch>
                  </Row>
                  <Link to={`/course/:${course.id}`}>
                    <Button variation="primary" size="small">
                      <Row gap="5px">
                        Edit
                        <HiPencilSquare size={15}></HiPencilSquare>
                      </Row>
                    </Button>
                  </Link>
                  <Modal.Open
                    opens="deleteCourseConfirmationModal"
                    fun={(e) => e.preventDefault()}
                  >
                    <Button variation="danger" size="small">
                      <Row gap="5px">
                        Delete
                        <HiMiniTrash size={15}></HiMiniTrash>
                      </Row>
                    </Button>
                  </Modal.Open>
                </Row>
              </Row>
              <Row gap="1rem" content="start" style={{ paddingLeft: "4rem" }}>
                Visible to roles: {course.visibleTo.map((role) => `${role} `)}
                <Modal.Window name="rolesAddModal">
                  <RollesAddForm
                    usedRoles={course.visibleTo}
                    handleSaveRoles={updateCourseVisibleRoles}
                    allRoles={currentRoles}
                    item={course}
                  ></RollesAddForm>
                </Modal.Window>
                <Modal.Window name="deleteCourseConfirmationModal">
                  <DeleteConfirmation
                    onConfirm={() => deleteCourse(course.id)}
                  ></DeleteConfirmation>
                </Modal.Window>
                <Modal.Open
                  opens="rolesAddModal"
                  fun={(e) => e.preventDefault()}
                >
                  <Button size="small">
                    <Row>
                      Manage Roles
                      <HiMiniPencilSquare size={15}></HiMiniPencilSquare>
                    </Row>
                  </Button>
                </Modal.Open>
              </Row>
              <hr></hr>
            </Row>
          ))}
        </Row>
      </Modal>
    </StyledAdminPanelContainer>
  );
}

export default AdminCoursesPanel;
