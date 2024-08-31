import styled from "styled-components";
import StyledFormLabel from "../../styles/StyledFormLabel";
import Row from "../../styles/Row";
import SelectBox from "../../ui/SelectBox";
import StyledButton from "../../styles/StyledButton";
import StyledFormTextArea from "../../styles/StyledFormTextArea";
import FileInput from "../../styles/FileInput";
import { useState } from "react";
import { useForm } from "react-hook-form";

const StyledFormContainer = styled.form`
  min-height: 150px;
  background-color: var(--color-gray-50);
  padding: 10px;
`;

const sizeXOptions = [
  { value: "auto", name: "auto" },
  { value: "300px", name: "300 px" },
  { value: "500px", name: "500 px" },
];
const sizeYOptions = [
  { value: "auto", name: "auto" },
  { value: "300px", name: "300 px" },
  { value: "500px", name: "500 px" },
];

function ImageCreateEditForm({
  onCloseModal,
  onLessonEdited,
  startingContent,
  isEditing,
}) {
  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm({
      defaultValues: {
        content: startingContent ? startingContent.content : "",
        sizeX: startingContent ? startingContent.sizeX : "auto",
        sizeY: startingContent ? startingContent.sizeY : "auto",
      },
    });

  const { errors } = formState;

  const [courseImage, setCourseImage] = useState(
    startingContent && startingContent.content
  );

  function onSizeXChanged(e) {
    console.log("changed X");
    console.log("new value:", e.target.value);
    setValue("sizeX", e.target.value); // Update form state
    setSizeX(e.target.value);
  }

  function onSizeYChanged(e) {
    console.log("Changed Y");
    setValue("sizeX", e.target.value); // Update form state
    setSizeY(e.target.value);
  }
  const [sizeX, setSizeX] = useState(getValues("sizeX"));
  const [sizeY, setSizeY] = useState(getValues("sizeY"));

  console.log("now sizeX is : ", sizeX);
  console.log("now sizeY is : ", sizeY);
  return (
    <StyledFormContainer>
      <Row content="flex-start" margin="10px 0px">
        <StyledFormLabel>Image:</StyledFormLabel>
        <FileInput
          id="image"
          accept="image/*"
          // {...register("image", {
          //   required: "This field is required",
          // })}
          onChange={(e) => {
            console.log(e.target.files[0]);
            setCourseImage(URL.createObjectURL(e.target.files[0]));
          }}
          {...register("content", { required: "This field is required" })}
        ></FileInput>
      </Row>
      <Row content="flex-start" margin="10px 0px" gap="10px">
        <StyledFormLabel>Image size X:</StyledFormLabel>
        <SelectBox
          selectTitle="Select Size x"
          options={sizeXOptions}
          value={sizeX}
          onChange={(e) => onSizeXChanged(e)}
          // {...register("sizeX", { required: "This field is required" })}
        ></SelectBox>
        <StyledFormLabel>Image size Y:</StyledFormLabel>
        <SelectBox
          selectTitle="Select Size y"
          options={sizeYOptions}
          value={sizeY}
          onChange={(e) => onSizeYChanged(e)}
          // {...register("sizeY", { required: "This field is required" })}
        ></SelectBox>
      </Row>
      <Row content="center">
        <img
          src={courseImage}
          alt="Not found"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: sizeX,
            height: sizeY,
            objectFit: "contain",
          }}
        ></img>
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

export default ImageCreateEditForm;
