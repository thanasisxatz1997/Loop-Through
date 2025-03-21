import styled from "styled-components";
import StyledFormLabel from "../../styles/StyledFormLabel";
import Row from "../../styles/Row";
import SelectBox from "../../ui/SelectBox";
import StyledButton from "../../styles/StyledButton";
import StyledFormTextArea from "../../styles/StyledFormTextArea";
import { useForm } from "react-hook-form";
import StyledFormTextInput from "../../styles/StyledFormTextInput";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";

const StyledFormContainer = styled.form`
  min-height: 150px;
  background-color: var(--color-gray-50);
  padding: 10px;
`;

const alignmentOptions = [
  { value: "center", name: "center" },
  { value: "start", name: "start" },
  { value: "end", name: "end" },
];

const sizeOptions = [
  {
    value: "10px",
    name: "10px",
  },
  {
    value: "12px",
    name: "12px",
  },
  {
    value: "15px",
    name: "15px",
  },
  {
    value: "18px",
    name: "18px",
  },
  {
    value: "20px",
    name: "20px",
  },
];

function ParagraphCreateEditForm({
  onCloseModal,
  onLessonEdited,
  startingContent,
  isEditing,
}) {
  const [backgroundColor, setBackgroundColor] = useState(
    startingContent ? startingContent.backgroundColor : ""
  );
  const [showColorPicker, setShowColorPicker] = useState(
    startingContent && startingContent.backgroundColor ? true : false
  );
  const { register, handleSubmit, reset, getValues, setValue, formState } =
    useForm({
      defaultValues: {
        content: startingContent ? startingContent.content : "",
        size: startingContent ? startingContent.size : "",
        textAlign: startingContent ? startingContent.textAlign : "",
      },
    });

  const { errors } = formState;

  function onSubmit(data) {
    onLessonEdited({ type: "p", ...data });
    onCloseModal?.();
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledFormContainer onSubmit={handleSubmit(onSubmit, onError)}>
      <StyledFormLabel>Text:</StyledFormLabel>
      <StyledFormTextArea
        style={{ height: "400px" }}
        {...register("content", { required: "This field is required" })}
      ></StyledFormTextArea>
      <Row content="flex-start" gap="10px" margin="10px 0px">
        <StyledFormLabel>Text align:</StyledFormLabel>
        <SelectBox
          id="textAlign"
          name="textAlign"
          selectTitle="Select Alignment"
          options={alignmentOptions}
          {...register("textAlign", { required: "This field is required" })}
        ></SelectBox>
      </Row>
      <Row content="flex-start" gap="10px" margin="10px 0px">
        <StyledFormLabel>Size:</StyledFormLabel>
        <SelectBox
          id="size"
          name="size"
          selectTitle="Select Size"
          options={sizeOptions}
          {...register("size", { required: "This field is required" })}
        ></SelectBox>
      </Row>
      <StyledFormLabel>Background color:</StyledFormLabel>
      <input
        type="checkbox"
        checked={showColorPicker}
        onChange={() => setShowColorPicker(!showColorPicker)}
      ></input>
      {showColorPicker && (
        <>
          <HexColorPicker
            id="backgroundColor"
            name="backgroundColor"
            color={backgroundColor}
            onChange={(backgroundColor) => {
              setBackgroundColor(backgroundColor);
              setValue("backgroundColor", backgroundColor);
            }}
          />
          <h5>{backgroundColor}</h5>
        </>
      )}
      <Row content="flex-start" margin="10px 0px" gap="10px">
        <StyledButton variation="success">Save</StyledButton>
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

export default ParagraphCreateEditForm;
