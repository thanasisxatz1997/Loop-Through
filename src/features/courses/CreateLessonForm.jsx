import styled from "styled-components";
import Heading from "../../styles/Heading";
import StyledButton from "../../styles/StyledButton";
import Row from "../../styles/Row";

const StyledFormLabel = styled.label`
  margin-right: 5px;
`;
const StyledFormTextInput = styled.input`
  border: solid 1px;
`;
function CreateLessonForm() {
  return (
    <div>
      <StyledFormLabel>
        <Heading as="h3">{`New lesson Name:`}</Heading>
      </StyledFormLabel>
      <Row margin="1rem 0rem">
        <StyledFormTextInput placeholder=" Enter Lesson Name"></StyledFormTextInput>
      </Row>
      <Row margin="1rem 0rem">
        <StyledButton>Create</StyledButton>
        <StyledButton variation="danger">Cancel</StyledButton>
      </Row>
      <Row></Row>
    </div>
  );
}

export default CreateLessonForm;
