import styled from "styled-components";
import Sidebar from "../ui/Sidebar";
import CourseButton from "../features/courses/CourseButton";
import CreateCourseButton from "../features/courses/CreateCourseButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCourse, getCourses } from "../services/apiCourses";
import Spinner from "../ui/Spinner";
import Modal from "../ui/Modal";
import CreateCourseForm from "../features/courses/CreateCourseForm";
import TagsAddFrom from "../ui/TagsAddFrom";
import { useState } from "react";
import { useCourses } from "../features/courses/useCourses";
import Heading from "../styles/Heading";
import Row from "../styles/Row";
import { useUser } from "../features/authentication/useUser";

const FullHeightContainer = styled.div`
  height: 100%;
`;

const StyledCoursesContainer = styled.div`
  /* background: radial-gradient(
    circle,
    #7ca3d68a 0%,
    #7ca3d68a 50%,
    #87a4c98a 100%
  ); */
  /* background-color: var(--bg-color-light-0); */
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    /* Transparent white overlay */ url("/2.jpg");
  background-size: cover; /* Ensures the image covers the div */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents tiling */
  /* opacity: 0.5; */
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;
  grid-template-columns: 36rem 1fr;
  /* grid-row: 1; */
`;

const StyledCoursesMainContainer = styled.main`
  display: grid;
  padding: 3rem;
  gap: 2rem;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(250px, max-content));
  justify-items: center;
  align-items: center;
  grid-auto-rows: 250px;
  grid-auto-columns: 250px;
`;

function Courses() {
  const queryClient = useQueryClient();
  const [searchTags, setSearchTags] = useState([]);

  const { courses, isLoadingCourses, error } = useCourses();
  const { user, isPending } = useUser();

  const { mutate: createNewCourse, isLoading: isCreatingCourse } = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success("New course successfully created.");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleChangeSearchTags(tags) {
    setSearchTags(tags);
  }

  if (isLoadingCourses || isCreatingCourse || isPending)
    return <Spinner></Spinner>;

  if (error) return <div>Error while loading courses.</div>;

  return (
    <FullHeightContainer>
      <Modal>
        <StyledCoursesContainer>
          <Sidebar courses={courses} searchTags={searchTags}></Sidebar>
          <div style={{ paddingTop: "2rem" }}>
            <Row content="center">
              <Heading textShadow="white">Recommended</Heading>
            </Row>
            <StyledCoursesMainContainer>
              {courses.map((course, index) => (
                <CourseButton
                  key={`${course.id}-${index}`}
                  id={course.id}
                  title={course.name}
                  description={course.description}
                  author={course.authorName}
                  image={course.image.replace(/ /g, "%20")}
                ></CourseButton>
              ))}
              <Modal.Window name="addTagsModal">
                <TagsAddFrom
                  usedTags={searchTags}
                  handleSaveTags={(tags) => handleChangeSearchTags(tags)}
                ></TagsAddFrom>
              </Modal.Window>
              {/* <Modal.Open opens="newCourseModal">
                <CreateCourseButton>Create a new Course!</CreateCourseButton>
              </Modal.Open> */}
              <Modal.Window name="newCourseModal">
                <CreateCourseForm
                  createCourse={createNewCourse}
                  userId={user.id}
                  user={user}
                ></CreateCourseForm>
              </Modal.Window>
            </StyledCoursesMainContainer>
          </div>
        </StyledCoursesContainer>
      </Modal>
    </FullHeightContainer>
  );
}

export default Courses;
