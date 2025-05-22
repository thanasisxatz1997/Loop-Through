import { useState } from "react";
import { usePublicImages } from "../../hooks/images/usePublicImages";
import { useForm } from "react-hook-form";
import { urlToFile } from "../../services/helpers";
import { v4 as uuidv4 } from "uuid";
import StyledFormLabel from "../../styles/StyledFormLabel";
import Row from "../../styles/Row";
import FileInput from "../../styles/FileInput";
import StyledButton from "../../styles/StyledButton";
import CourseButton from "./CourseButton";
import Heading from "../../styles/Heading";
import Spinner from "../../ui/Spinner";
import { useChangeCourseImage } from "./useChangeCourseImage";

function ChangeCourseImageForm({ course, onCloseModal, userId, user }) {
  const [courseImage, setCourseImage] = useState(null);
  const [selectedPublicImage, setSelectedPublicImage] = useState(null);

  const { publicImages, isLoadingPublicImages } = usePublicImages();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: { authorId: userId },
  });

  const { changeCourseImage, isChangingCourseImage } = useChangeCourseImage();

  console.log("userID: ", userId);
  const { errors } = formState;
  console.log("inside create course form: ");
  console.log("The course: ", course);

  async function onSubmit(data) {
    console.log("THE DATA! : ", data);
    if (data.image[0]) {
      console.log("data being sent in course: ", data);
      changeCourseImage({ course: course, newImage: data.image[0] });
    } else {
      const selectedImageFile = await urlToFile(selectedPublicImage, uuidv4());
      console.log("data being sent in course: ", data);
      changeCourseImage({ course: course, newImage: selectedImageFile });
    }

    onCloseModal?.();
  }

  function selectPublicImage(image) {
    setSelectedPublicImage(image);
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoadingPublicImages || isChangingCourseImage) {
    return <Spinner></Spinner>;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <StyledFormLabel>
        <Heading as="h2">{`Change Course Image`}</Heading>
      </StyledFormLabel>
      <Row style={{ height: "600px" }} gap="1rem">
        <Row type="vertical" gap="1px">
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
              Save
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
                title={course?.name}
                description={course?.description}
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

export default ChangeCourseImageForm;
