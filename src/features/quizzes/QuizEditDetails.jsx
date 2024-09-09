import styled from "styled-components";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import StyledFormLabel from "../../styles/StyledFormLabel";
import StyledFormTextInput from "../../styles/StyledFormTextInput";
import { useForm } from "react-hook-form";
import SelectBox from "../../ui/SelectBox";
import StyledFormTextArea from "../../styles/StyledFormTextArea";
import Modal from "../../ui/Modal";
import Button from "../../styles/StyledButton";
import { HiMiniPencilSquare } from "react-icons/hi2";

const StyledQuizDetails = styled.form`
  background-color: #ffffffd1;
  width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  align-self: flex-start;
  gap: 10px;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
`;

const difficultyOptions = [
  { value: "Easy", name: "Easy" },
  { value: "Medium", name: "Medium" },
  { value: "Hard", name: "Hard" },
];

function QuizEditDetails({ quiz }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {
      name: quiz ? quiz.name : "",
      description: quiz ? quiz.description : "",
      difficulty: quiz ? quiz.difficulty : "",
    },
  });
  const { errors } = formState;
  function onSubmit(data) {}

  function onError(errors) {
    console.log(errors);
  }
  return (
    <StyledQuizDetails onSubmit={handleSubmit(onSubmit, onError)}>
      <Heading as="h2">Quiz Details:</Heading>
      <Row>
        <StyledFormLabel>Name:</StyledFormLabel>
        <StyledFormTextInput
          id="name"
          {...register("name", { required: "This field is required" })}
          placeholder="Name:"
        ></StyledFormTextInput>
      </Row>
      <Row>
        <StyledFormLabel>Difficulty:</StyledFormLabel>
        <SelectBox
          options={difficultyOptions}
          id="difficulty"
          {...register("difficulty", {
            required: "This field is required",
          })}
          placeholder="Difficulty:"
        ></SelectBox>
      </Row>
      <Row type="vertical" gap="1px">
        <StyledFormLabel>Description:</StyledFormLabel>
        <StyledFormTextArea
          width="40vh"
          options={difficultyOptions}
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
          placeholder="Description:"
        ></StyledFormTextArea>
      </Row>
      <Row content="start" gap="5px">
        <Heading as="h3">Tags:</Heading>
        <SelectBox
          selectTitle="none"
          options={quiz.tags.map((tag) => ({
            value: tag,
            name: tag,
          }))}
        ></SelectBox>
        <Modal.Open opens="addTagsModal" fun={(e) => e.preventDefault()}>
          <Button size="small">
            <HiMiniPencilSquare size={20}></HiMiniPencilSquare>
          </Button>
        </Modal.Open>
      </Row>
    </StyledQuizDetails>
  );
}

export default QuizEditDetails;
