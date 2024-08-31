import styled from "styled-components";
import StyledFormLabel from "../../styles/StyledFormLabel";
import Row from "../../styles/Row";
import SelectBox from "../../ui/SelectBox";
import StyledButton from "../../styles/StyledButton";
import StyledFormTextArea from "../../styles/StyledFormTextArea";
import { useForm } from "react-hook-form";

const StyledFormContainer = styled.form`
  min-height: 150px;
  background-color: var(--color-gray-50);
  padding: 10px;
`;

const alignmentOptions = [{ value: "center", name: "center" }];

function ParagraphCreateEditForm({
  onCloseModal,
  onLessonEdited,
  startingContent,
  isEditing,
}) {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {
      content: startingContent ? startingContent.content : "",
      size: startingContent ? startingContent.size : "",
    },
  });

  const { errors } = formState;
  return (
    <StyledFormContainer>
      <StyledFormLabel>Text:</StyledFormLabel>
      <StyledFormTextArea></StyledFormTextArea>
      <Row content="flex-start" gap="10px" margin="10px 0px">
        <StyledFormLabel>Text align:</StyledFormLabel>
        <SelectBox
          selectTitle="Select Alignment"
          options={alignmentOptions}
        ></SelectBox>
      </Row>
      <Row content="flex-start" margin="10px 0px" gap="10px">
        <StyledButton variation="success">Cancel</StyledButton>
        <StyledButton variation="danger">Cancel</StyledButton>
      </Row>
    </StyledFormContainer>
  );
}

export default ParagraphCreateEditForm;
