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
import {
  HiMiniStar,
  HiMiniTrash,
  HiEyeSlash,
  HiMiniDocumentArrowUp,
  HiMiniPlusCircle,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import Modal from "../ui/Modal";
import CreateCourseForm from "../features/courses/CreateCourseForm";
import { useCreateCourse } from "../features/courses/useCreateCourse";

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
  { value: "Easy", name: "Easy" },
  { value: "Medium", name: "Medium" },
  { value: "Hard", name: "Hard" },
];

const statusOptions = [
  { value: "Completed", name: "Completed" },
  { value: "In progress", name: "In progress" },
  { value: "Not started", name: "Not started" },
];

const tagsOptions = [
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

  const { userCourses, isPending: isPendingCourses } = useUserCourses(user.id);

  console.log("Inside userCourses", userCourses);

  const { createNewCourse, isCreatingCourse } = useCreateCourse();

  if (isFetchingUser || isPendingUser || isPendingCourses)
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
            <SelectBox
              options={dificultyOptions}
              selectTitle="Dificulty"
            ></SelectBox>
            <SelectBox options={statusOptions} selectTitle="Status"></SelectBox>
            <SelectBox options={tagsOptions} selectTitle="Tags"></SelectBox>
            <SearchBar></SearchBar>
          </Row>
          <StyledCourseList>
            {userCourses.map((course) => (
              <li key={course.id}>
                <Row padding="20px 0px" gap="3rem">
                  <CourseButton
                    id={course.id}
                    title={course.name}
                    description={course.description}
                    author={course.authorName}
                    image={course.image}
                  ></CourseButton>
                  <Row type="vertical">
                    <Row content="center">
                      <Heading as="h2">Details</Heading>
                    </Row>
                    <Row gap="10px" content="start">
                      <Heading as="h3">Name:</Heading>
                      <StyledFormTextInput
                        defaultValue={course.name}
                      ></StyledFormTextInput>
                    </Row>
                    <Row gap="10px">
                      <StyledFormTextArea
                        placeholder="Description"
                        defaultValue={course.description}
                        width="500px"
                        height="150px"
                      ></StyledFormTextArea>
                    </Row>
                    <Row content="start">
                      <Heading as="h3">Tags:</Heading>
                      <SelectBox options={tagsOptions}></SelectBox>
                    </Row>
                    <Row content="start" gap="10px">
                      <Heading as="h3">Rating:</Heading>
                      <Heading as="h3">{course.rating}</Heading>
                      <HiMiniStar size={20}></HiMiniStar>
                      <Heading as="h3">(318 reviews)</Heading>
                    </Row>
                    <Row content="start" gap="3px">
                      <Heading as="h3">{course.lessons.length}</Heading>
                      <Heading as="h3">
                        {course.lessons.length === 1 ? "lesson" : "lessons"}
                      </Heading>
                    </Row>
                  </Row>
                  <Row type="vertical">
                    <Row content="center">
                      <Heading as="h2">Options</Heading>
                    </Row>
                    <Row type="vertical">
                      <Button>
                        <Row gap="5px">
                          Change Image
                          <HiMiniDocumentArrowUp
                            size={20}
                          ></HiMiniDocumentArrowUp>
                        </Row>
                      </Button>
                      <Button>
                        <Row gap="5px">
                          Make private <HiEyeSlash size={20}></HiEyeSlash>
                        </Row>
                      </Button>

                      <Button variation="danger">
                        <Row gap="5px">
                          Delete Course <HiMiniTrash size={20}></HiMiniTrash>
                        </Row>
                      </Button>
                    </Row>
                  </Row>
                </Row>
                <hr></hr>
              </li>
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

        <Modal.Window name="newCourseModal">
          <CreateCourseForm
            createCourse={createNewCourse}
            userId={user.id}
          ></CreateCourseForm>
        </Modal.Window>
      </Modal>
    </StyledCoursesContainer>
  );
}

export default UserCourses;
