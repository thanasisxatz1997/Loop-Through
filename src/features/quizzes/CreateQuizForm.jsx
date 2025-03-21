import { useForm } from "react-hook-form";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import Button from "../../styles/StyledButton";
import StyledFormLabel from "../../styles/StyledFormLabel";
import StyledFormTextArea from "../../styles/StyledFormTextArea";
import StyledFormTextInput from "../../styles/StyledFormTextInput";
import SelectBox from "../../ui/SelectBox";
import { createQuiz } from "../../services/apiQuizzes";
import { useUser } from "../authentication/useUser";

const dificultyOptions = [
  { value: "Easy", name: "Easy" },
  { value: "Medium", name: "Medium" },
  { value: "Hard", name: "Hard" },
];

function CreateQuizForm({ user, createNewQuiz, onCloseModal }) {
  const authorId = user.id;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: { authorId: authorId },
  });
  const { errors } = formState;

  function onSubmit(data) {
    createNewQuiz(data);
    onCloseModal?.();
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Row type="vertical">
        <StyledFormLabel>
          <Heading as="h2">{`New Quiz`}</Heading>
        </StyledFormLabel>
        <Row margin="0rem 0rem">
          <StyledFormTextInput
            id="name"
            placeholder="Name:"
            {...register("name", { required: "This field is required" })}
            //   onChange={(e) => setCourseName(e.target.value)}
          ></StyledFormTextInput>
        </Row>
        <Row type="vertical" margin="0px" padding="0px" gap="0px">
          <StyledFormLabel>
            <Heading as="h4">Description:</Heading>
          </StyledFormLabel>
          <StyledFormTextArea
            id="description"
            placeholder="Quiz Description"
            {...register("description", { required: "This field is required" })}
          ></StyledFormTextArea>
        </Row>
        <Row>
          <StyledFormLabel>
            <Heading as="h4">Dificulty:</Heading>
          </StyledFormLabel>
          <SelectBox
            id="dificulty"
            options={dificultyOptions}
            {...register("dificulty", { required: "This field is required" })}
          ></SelectBox>
        </Row>
        <Row margin="1rem 0rem">
          <Button
            variation="success"
            // onClick={() => {
            //   console.log("clicking with : ", courseName, "image: ", courseImage);
            //   createCourse({ courseName, courseDescription, courseImage });
            //   onCloseModal();
            // }}
          >
            Create
          </Button>
          <Button variation="danger" onClick={onCloseModal}>
            Cancel
          </Button>
        </Row>
      </Row>
    </form>
  );
}

export default CreateQuizForm;
