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
import { useUser } from "../authentication/useUser";
import Spinner from "../../ui/Spinner";
import { usePublicImages } from "../../hooks/images/usePublicImages";
import Button from "../../styles/StyledButton";
import { urlToFile } from "../../services/helpers";
import { v4 as uuidv4 } from "uuid";

function CreateCourseForm({ createCourse, onCloseModal, userId, user }) {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [selectedPublicImage, setSelectedPublicImage] = useState(null);

  const { publicImages, isLoadingPublicImages } = usePublicImages();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: { authorId: userId },
  });
  console.log("userID: ", userId);
  const { errors } = formState;
  console.log("inside create course form: ");
  async function onSubmit(data) {
    if (data.image[0]) {
      console.log("data being sent in course: ", data);
      createCourse({
        ...data,
        image: data.image[0],
        authorId: userId,
        authorName: user.user_metadata.username,
      });
    } else {
      const selectedImageFile = await urlToFile(selectedPublicImage, uuidv4());
      console.log("data being sent in course: ", data);
      createCourse({
        ...data,
        image: selectedImageFile,
        authorId: userId,
        authorName: user.user_metadata.username,
      });
    }

    onCloseModal?.();
  }

  function selectPublicImage(image) {
    setSelectedPublicImage(image);
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoadingPublicImages) {
    return <Spinner></Spinner>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <StyledFormLabel>
        <Heading as="h2">{`New Course`}</Heading>
      </StyledFormLabel>
      <Row style={{ height: "600px" }} gap="1rem">
        <Row type="vertical" gap="1px">
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
              {...register("description", {
                required: "This field is required",
              })}
              onChange={(e) => setCourseDescription(e.target.value)}
            ></StyledFormTextArea>
          </Row>
          <Row margin="1rem 0rem" gap="1rem">
            <FileInput
              id="image"
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                console.log(e.target.files[0]);
                setCourseImage(URL.createObjectURL(e.target.files[0]));
              }}
            ></FileInput>

            {/* <Button
              size={"medium"}
              style={{
                whiteSpace: "nowrap",
                padding: "0.8rem 1.2rem",
                borderRadius: "var(--border-radius-sm)",
              }}
            >{`Public Image`}</Button> */}
          </Row>
          <Row margin="1rem 0rem">
            <StyledButton
              variation="success"
              // onClick={() => {
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
                image={
                  courseImage
                    ? courseImage
                    : selectedPublicImage
                    ? selectedPublicImage
                    : ""
                }
              ></CourseButton>
            </Row>
          </Row>
        </Row>
        <Row
          type="vertical"
          style={{
            height: "100%",
            borderLeft: "solid 1px",
            width: "200px",
            paddingLeft: "1rem",
          }}
        >
          <StyledFormLabel>
            <Heading
              as="h4"
              style={{ whiteSpace: "nowrap" }}
            >{`Public images:`}</Heading>
          </StyledFormLabel>
          <div style={{ height: "100%", overflow: "auto" }}>
            {publicImages.map((image) => (
              <div
                key={image}
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  padding: "5px",
                  transition: "background 0.1s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--color-brand-500)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
                onClick={() => selectPublicImage(image)}
              >
                <img src={image} alt="public_image"></img>
              </div>
            ))}
          </div>
        </Row>
      </Row>
    </form>
  );
}

export default CreateCourseForm;
