import styled from "styled-components";
import Row from "../styles/Row";
import Heading from "../styles/Heading";
import SelectBox from "../ui/SelectBox";
import SearchBar from "../ui/SearchBar";
import { useUser } from "../features/authentication/useUser";
import { useUserCourses } from "../features/courses/useUserCourses";
import Spinner from "../ui/Spinner";
import CourseButton from "../features/courses/CourseButton";
import StyledFormTextInput from "../styles/StyledFormTextInput";
import StyledFormTextArea from "../styles/StyledFormTextArea";
import Button from "../styles/StyledButton";
import DeleteConfirmation from "../ui/DeleteConfirmation";
import {
  HiMiniStar,
  HiMiniTrash,
  HiEyeSlash,
  HiMiniDocumentArrowUp,
  HiMiniPlusCircle,
  HiMiniPlus,
  HiOutlineCheck,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import Modal from "../ui/Modal";
import CreateCourseForm from "../features/courses/CreateCourseForm";
import { useCreateCourse } from "../features/courses/useCreateCourse";
import { useDeleteCourse } from "../features/courses/useDeleteCourse";
import { useState } from "react";
import TagsAddFrom from "../ui/TagsAddFrom";
import { useEditCourse } from "../features/courses/useEditCourse";
import UserCourseDisplayComponent from "../features/courses/UserCourseDisplayComponent";

const StyledCoursesContainer = styled.div`
  background-color: var(--bg-color-light-0);
  height: 100%;
`;

const StyledCoursesMainContainer = styled.main`
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const StyledCourseList = styled.ul`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: #ffffff59;
  min-width: 50rem;
`;

const StyledLink = styled(Link)`
  color: inherit; /* This will make the link inherit the text color */
  text-decoration: none; /* Removes the underline */

  &:hover {
    color: var(--color-brand-600); /* Change the text color to blue on hover */
  }
`;

const dificultyOptions = [
  { value: null, name: null },
  { value: "Easy", name: "Easy" },
  { value: "Medium", name: "Medium" },
  { value: "Hard", name: "Hard" },
];

const statusOptions = [
  { value: null, name: null },
  { value: "Completed", name: "Completed" },
  { value: "In progress", name: "In progress" },
  { value: "Not started", name: "Not started" },
];

const tagsOptions = [
  { value: null, name: null },
  { value: "Algorithms", name: "Algorithms" },
  { value: "React", name: "React" },
  { value: "Programming", name: "Programming" },
];

function UserCourses() {
  const {
    user,
    isPending: isPendingUser,
    isAuthenticated,
    isFetching: isFetchingUser,
  } = useUser();

  const { deleteCourse, isDeletingCourse } = useDeleteCourse();

  const { userCourses, isPending: isPendingCourses } = useUserCourses(user.id);

  const { editCourse, isEditingCourse } = useEditCourse();

  const { createNewCourse, isCreatingCourse } = useCreateCourse();

  const [targetCourseId, setTargetCourseId] = useState(null);

  const [difficultyFilter, setDifficultyFilter] = useState(null);

  const [statusFilter, setStatusFilter] = useState(null);

  const [tagsFilter, setTagsFilter] = useState(null);

  const displayedCourses = FilterCourses();

  function FilterCourses() {
    let courses = userCourses || [];
    if (difficultyFilter) {
      courses = courses.filter(
        (course) => course.difficulty === difficultyFilter
      );
    }
    if (statusFilter) {
      courses = courses.filter((course) => course.status === statusFilter);
    }
    if (tagsFilter) {
      courses = courses.filter((course) => course.tags.includes(tagsFilter));
    }
    return courses;
  }
  const currentTags =
    (targetCourseId &&
      userCourses.find((course) => course.id === targetCourseId)?.tags) ||
    [];

  function handleEditCourse(course) {
    editCourse(course);
  }

  function handleSaveTags(newTags) {
    const courseToEdit = userCourses.find(
      (course) => course.id === targetCourseId
    );
    const newCourse = { ...courseToEdit, tags: newTags };
    editCourse(newCourse);
  }

  if (
    isFetchingUser ||
    isPendingUser ||
    isPendingCourses ||
    isDeletingCourse ||
    isEditingCourse ||
    isCreatingCourse
  )
    return <Spinner></Spinner>;

  if (!isAuthenticated)
    return (
      <StyledCoursesContainer>
        <Heading> Error, Unauthenticated user</Heading>
      </StyledCoursesContainer>
    );

  return (
    <StyledCoursesContainer>
      <Modal>
        <StyledCoursesMainContainer>
          <Row content="center">
            <Heading>My Courses</Heading>
          </Row>
          <Row content="start" gap="10px">
            <label>Dificulty:</label>
            <SelectBox
              onChange={(e) => setDifficultyFilter(e.target.value)}
              options={dificultyOptions}
              selectTitle="Dificulty"
            ></SelectBox>
            <label>Status:</label>
            <SelectBox options={statusOptions} selectTitle="Status"></SelectBox>
            <label>Tags:</label>
            <SelectBox
              options={tagsOptions}
              selectTitle="Tags"
              onChange={(e) => setTagsFilter(e.target.value)}
            ></SelectBox>
            <SearchBar></SearchBar>
          </Row>
          <StyledCourseList>
            {displayedCourses.map((course) => (
              <UserCourseDisplayComponent
                key={course.id}
                handleEditCourse={handleEditCourse}
                course={course}
                setTargetCourseId={setTargetCourseId}
              ></UserCourseDisplayComponent>
            ))}
            <li>
              <Row content="center">
                <Modal.Open opens="newCourseModal">
                  <StyledLink>
                    <Button variation="transparent" size="large" shadow="none">
                      <Row>
                        <HiMiniPlusCircle size={20}></HiMiniPlusCircle>
                        New Course
                      </Row>
                    </Button>
                  </StyledLink>
                </Modal.Open>
              </Row>
            </li>
          </StyledCourseList>
        </StyledCoursesMainContainer>

        <Modal.Window name="addTagsModal">
          <TagsAddFrom
            usedTags={currentTags}
            handleSaveTags={handleSaveTags}
          ></TagsAddFrom>
        </Modal.Window>
        <Modal.Window name="newCourseModal">
          <CreateCourseForm
            createCourse={createNewCourse}
            userId={user.id}
          ></CreateCourseForm>
        </Modal.Window>
        <Modal.Window name="deleteCourseConfirmationModal">
          <DeleteConfirmation
            onConfirm={() => deleteCourse(targetCourseId)}
          ></DeleteConfirmation>
        </Modal.Window>
      </Modal>
    </StyledCoursesContainer>
  );
}

export default UserCourses;
