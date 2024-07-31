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
const StyledFormTextArea = styled.textarea`
  margin-top: 1rem;
  padding: 2px;
  font-size: large;
  border: solid 1px;
  width: 100%;
  resize: none;
`;
function CreateCourseForm({ createCourse, onCloseModal }) {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState("");

  return (
    <div>
      <StyledFormLabel>
        <Heading as="h2">{`New Course`}</Heading>
      </StyledFormLabel>
      <Row margin="0rem 0rem">
        <StyledFormTextInput
          placeholder="Name:"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        ></StyledFormTextInput>
      </Row>
      <Row margin="0rem 0rem">
        <StyledFormTextArea
          placeholder="Description:"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        ></StyledFormTextArea>
      </Row>
      <Row margin="1rem 0rem" content="flex-start" gap="1rem">
        <StyledButton variation="secondary" size="small">
          Upload image
        </StyledButton>
      </Row>
      <Row margin="1rem 0rem">
        <StyledButton
          onClick={() => {
            console.log("clicking with : ", courseName);
            createCourse({ courseName });
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

export default CreateCourseForm;
