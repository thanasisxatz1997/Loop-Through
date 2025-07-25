import { useState } from "react";
import Row from "../styles/Row";
import Button from "../styles/StyledButton";
import StyledFormTextInput from "../styles/StyledFormTextInput";

function RenameLessonModal({ currentName, handleRenameLesson, onCloseModal }) {
  const [lessonName, setLessonName] = useState(currentName);
  return (
    <div>
      <h3>Lesson Name: </h3>
      <StyledFormTextInput
        value={lessonName}
        onChange={(e) => setLessonName(e.target.value)}
      ></StyledFormTextInput>
      <Row style={{ marginTop: "1rem" }} gap="1rem">
        <Button
          variation="success"
          onClick={() => {
            handleRenameLesson(lessonName);
            onCloseModal();
          }}
        >
          Save
        </Button>
        <Button onClick={onCloseModal}>Cancel</Button>
      </Row>
    </div>
  );
}

export default RenameLessonModal;
