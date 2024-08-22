import styled from "styled-components";
import Heading from "../../styles/Heading";
import StyledButton from "../../styles/StyledButton";
import Row from "../../styles/Row";
import { useState } from "react";
import FileInput from "../../styles/FileInput";
import { useForm } from "react-hook-form";
import CourseButton from "./CourseButton";
import StyledFormTextArea from "../../styles/StyledFormTextArea";
import StyledFormTextInput from "../../styles/StyledFormTextInput";
import StyledFormLabel from "../../styles/StyledFormLabel";

function CreateCourseForm({ createCourse, onCloseModal }) {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState(null);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;
  function onSubmit(data) {
    console.log("inside submit");
    console.log({ ...data, image: data.image[0] });
    createCourse({ ...data, image: data.image[0] });
    console.log("done creating");
    console.log();
    onCloseModal?.();
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <StyledFormLabel>
        <Heading as="h2">{`New Course`}</Heading>
      </StyledFormLabel>
      <Row margin="0rem 0rem">
        <StyledFormTextInput
          id="name"
          placeholder="Name:"
          {...register("name", { required: "This field is required" })}
          onChange={(e) => setCourseName(e.target.value)}
        ></StyledFormTextInput>
      </Row>
      <Row margin="0rem 0rem">
        <StyledFormTextArea
          id="description"
          placeholder="Description:"
          {...register("description", { required: "This field is required" })}
          onChange={(e) => setCourseDescription(e.target.value)}
        ></StyledFormTextArea>
      </Row>
      <Row margin="1rem 0rem" content="flex-start" gap="1rem">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })}
          onChange={(e) => {
            console.log(e.target.files[0]);
            setCourseImage(URL.createObjectURL(e.target.files[0]));
          }}
        ></FileInput>
      </Row>
      <Row margin="1rem 0rem">
        <StyledButton
          variation="success"
          // onClick={() => {
          //   console.log("clicking with : ", courseName, "image: ", courseImage);
          //   createCourse({ courseName, courseDescription, courseImage });
          //   onCloseModal();
          // }}
        >
          Create
        </StyledButton>
        <StyledButton variation="danger" onClick={onCloseModal}>
          Cancel
        </StyledButton>
      </Row>
      <hr></hr>
      <Row type="vertical">
        <Row padding="1rem">
          <Heading as={"h4"}>PREVIEW:</Heading>
        </Row>
        <Row content="center">
          <CourseButton
            preview={true}
            title={courseName}
            description={courseDescription}
            image={courseImage ? courseImage : ""}
          ></CourseButton>
        </Row>
      </Row>
    </form>
  );
}

export default CreateCourseForm;
