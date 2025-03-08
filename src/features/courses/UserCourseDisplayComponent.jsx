import {
  HiEyeSlash,
  HiMiniDocumentArrowUp,
  HiMiniStar,
  HiMiniTrash,
  HiOutlineCheck,
  HiMiniArrowPath,
  HiMiniPencilSquare,
} from "react-icons/hi2";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import StyledFormTextArea from "../../styles/StyledFormTextArea";
import StyledFormTextInput from "../../styles/StyledFormTextInput";
import Modal from "../../ui/Modal";
import SelectBox from "../../ui/SelectBox";
import CourseButton from "./CourseButton";
import Button from "../../styles/StyledButton";
import { useEffect, useState } from "react";

function UserCourseDisplayComponent({
  course,
  setTargetCourseId,
  handleEditCourse,
}) {
  const [newCourse, setNewCourse] = useState(course);

  function handleReset() {
    setNewCourse(course);
  }

  useEffect(() => {
    setNewCourse(course);
  }, [course]);
  return (
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
              value={newCourse.name}
              onChange={(e) =>
                setNewCourse((newCourse) => ({
                  ...newCourse,
                  name: e.target.value,
                }))
              }
            ></StyledFormTextInput>
          </Row>
          <Row gap="10px">
            <StyledFormTextArea
              placeholder="Description"
              //   defaultValue={course.description}
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse((newCourse) => ({
                  ...newCourse,
                  description: e.target.value,
                }))
              }
              width="500px"
              height="150px"
            ></StyledFormTextArea>
          </Row>
          <Row content="start" gap="5px">
            <Heading as="h3">Tags:</Heading>
            <SelectBox
              selectTitle="none"
              options={course.tags.map((tag) => ({
                value: tag,
                name: tag,
              }))}
            ></SelectBox>
            <Modal.Open
              opens="addTagsModal"
              fun={() => setTargetCourseId(course.id)}
            >
              <Button size="small">
                <HiMiniPencilSquare size={20}></HiMiniPencilSquare>
              </Button>
            </Modal.Open>
          </Row>
          <Row content="start" gap="10px">
            <Heading as="h3">Rating:</Heading>
            <Heading as="h3">{course.rating}</Heading>
            <HiMiniStar size={20}></HiMiniStar>
            <Heading as="h3">({course.totalRatings} reviews)</Heading>
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
            <Button onClick={handleReset}>
              <Row gap="5px">
                Reset Changes
                <HiMiniArrowPath size={20}></HiMiniArrowPath>
              </Row>
            </Button>
            <Button>
              <Row gap="5px">
                Change Image
                <HiMiniDocumentArrowUp size={20}></HiMiniDocumentArrowUp>
              </Row>
            </Button>
            <Button>
              <Row gap="5px">
                Make private <HiEyeSlash size={20}></HiEyeSlash>
              </Row>
            </Button>
            <Button
              variation="success"
              onClick={() => {
                handleEditCourse(newCourse);
              }}
            >
              <Row gap="5px">
                Save Changes
                <HiOutlineCheck size={20}></HiOutlineCheck>
              </Row>
            </Button>
            <Modal.Open
              opens="deleteCourseConfirmationModal"
              fun={() => setTargetCourseId(course.id)}
            >
              <Button variation="danger">
                <Row gap="5px">
                  Delete Course
                  <HiMiniTrash size={20}></HiMiniTrash>
                </Row>
              </Button>
            </Modal.Open>
          </Row>
        </Row>
      </Row>
      <hr></hr>
    </li>
  );
}

export default UserCourseDisplayComponent;
