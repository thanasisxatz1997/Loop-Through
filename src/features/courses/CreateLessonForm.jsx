import styled from "styled-components";
import Heading from "../../styles/Heading";
import StyledButton from "../../styles/StyledButton";
import Row from "../../styles/Row";
import { useState } from "react";

const StyledFormLabel = styled.label`
  margin-right: 5px;
`;
const StyledFormTextInput = styled.input`
  padding: 2px;
  font-size: large;
  border: solid 1px;
`;
function CreateLessonForm({
  createLesson,
  courseId,
  lessonNumber,
  onCloseModal,
}) {
  const [lessonName, setLessonName] = useState("");
  console.log("in form: ", courseId, lessonNumber);
  return (
    <div>
      <StyledFormLabel>
        <Heading as="h2">{`New lesson`}</Heading>
      </StyledFormLabel>
      <Row margin="0rem 0rem">
        <StyledFormTextInput
          placeholder=" Enter Lesson Name"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
        ></StyledFormTextInput>
      </Row>
      <Row margin="1rem 0rem">
        <StyledButton
          onClick={() => {
            console.log("clicking with : ", lessonName, courseId, lessonNumber);
            createLesson({ lessonName, courseId, lessonNumber });
            onCloseModal();
          }}
        >
          Create
        </StyledButton>
        <StyledButton variation="danger" onClick={onCloseModal}>
          Cancel
        </StyledButton>
      </Row>
      <Row></Row>
    </div>
  );
}

export default CreateLessonForm;
