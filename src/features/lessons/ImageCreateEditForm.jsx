import styled from "styled-components";
import StyledFormLabel from "../../styles/StyledFormLabel";
import Row from "../../styles/Row";
import SelectBox from "../../ui/SelectBox";
import StyledButton from "../../styles/StyledButton";
import StyledFormTextArea from "../../styles/StyledFormTextArea";
import FileInput from "../../styles/FileInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { uploadLessonImage } from "../../services/imageService";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";

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
  lesson,
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
  const { user, isPending, isAuthenticated, isFetching } = useUser();
  const [courseImage, setCourseImage] = useState(
    startingContent && startingContent.content
  );

  const editMode = startingContent !== null ? true : false;

  function onSizeXChanged(e) {
    setValue("sizeX", e.target.value); // Update form state
    setSizeX(e.target.value);
  }

  function onSizeYChanged(e) {
    setValue("sizeY", e.target.value); // Update form state
    setSizeY(e.target.value);
  }
  const [sizeX, setSizeX] = useState(getValues("sizeX"));
  const [sizeY, setSizeY] = useState(getValues("sizeY"));

  // useEffect(() => {
  //   return () => {
  //     if (courseImage) {
  //       URL.revokeObjectURL(courseImage);
  //     }
  //   };
  // }, [courseImage]);

  async function onSubmit(data) {
    try {
      if (data.content[0].name) {
        const { imagePath, imageName } = await uploadLessonImage(
          user.id,
          lesson.courseId,
          lesson.id,
          data.content[0]
        );
        if (imagePath && imageName) {
          onLessonEdited({
            type: "i",
            ...data,
            content: imagePath,
            imageName: imageName,
          });
        } else {
          toast.error("Error while uploading image.");
        }
      } else {
        onLessonEdited({
          type: "i",
          ...data,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
    onCloseModal?.();
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledFormContainer onSubmit={handleSubmit(onSubmit, onError)}>
      <Row content="flex-start" margin="10px 0px">
        <StyledFormLabel>Image:</StyledFormLabel>
        <FileInput
          id="content"
          accept="image/*"
          {...register("content", {
            required: !editMode ? "This field is required" : false,
          })}
          onInput={(e) => {
            setCourseImage(URL.createObjectURL(e.target.files[0]));
          }}
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
      <Row
        content="center"
        style={{ width: "auto", maxHeight: "50rem", overflow: "scroll" }}
      >
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
