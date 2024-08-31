import styled from "styled-components";
import StyledFormLabel from "../../styles/StyledFormLabel";
import StyledFormTextInput from "../../styles/StyledFormTextInput";
import Row from "../../styles/Row";
import SelectBox from "../../ui/SelectBox";
import StyledButton from "../../styles/StyledButton";
import { useForm } from "react-hook-form";

const StyledFormContainer = styled.form`
  min-height: 150px;
  background-color: var(--color-gray-50);
  padding: 10px;
`;

const titleOptions = [
  {
    value: "h1",
    name: "Large",
  },
  {
    value: "h2",
    name: "Medium",
  },
  {
    value: "h3",
    name: "Small",
  },
];

function TitleCreateEditForm({
  onCloseModal,
  onLessonEdited,
  startingContent,
  isEditing,
}) {
  console.log("inside title:", startingContent);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {
      content: startingContent ? startingContent.content : "",
      size: startingContent ? startingContent.size : "",
    },
  });

  const { errors } = formState;

  function onSubmit(data) {
    onLessonEdited({ type: "t", ...data });
    onCloseModal?.();
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <StyledFormContainer onSubmit={handleSubmit(onSubmit, onError)}>
      <Row content="flex-start" gap="10px" margin="10px 0px">
        <StyledFormLabel>Title:</StyledFormLabel>
        <StyledFormTextInput
          id="content"
          placeholder="enter a title"
          {...register("content", { required: "This field is required" })}
        ></StyledFormTextInput>
      </Row>
      <Row content="flex-start" gap="10px" margin="10px 0px">
        <StyledFormLabel>Size:</StyledFormLabel>
        <SelectBox
          selectTitle="Select Size"
          options={titleOptions}
          id="size"
          name="size"
          {...register("size", { required: "This field is required" })}
        ></SelectBox>
      </Row>
      <Row content="flex-start" margin="10px 0px" gap="10px">
        <StyledButton variation="success" disabled={isEditing}>
          Save
        </StyledButton>
        <StyledButton
          variation="danger"
          onClick={onCloseModal}
          disabled={isEditing}
        >
          Cancel
        </StyledButton>
      </Row>
    </StyledFormContainer>
  );
}

export default TitleCreateEditForm;
