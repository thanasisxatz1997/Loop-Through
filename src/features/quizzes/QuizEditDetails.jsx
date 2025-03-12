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
import TagsAddFrom from "../../ui/TagsAddFrom";
import { useEditQuiz } from "./useEditQuiz";

const StyledQuizDetails = styled.div`
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

function QuizEditDetails({
  quiz,
  handleUpdateQuiz,
  register,
  setValue,
  getValues,
  handleSaveTags,
  currentTags,
}) {
  return (
    <StyledQuizDetails>
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
          width="350px"
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
          options={currentTags.map((tag) => ({
            value: tag,
            name: tag,
          }))}
        ></SelectBox>
        <Modal>
          <Modal.Window name="addTagsModal">
            <TagsAddFrom
              usedTags={getValues("tags")}
              handleSaveTags={handleSaveTags}
            ></TagsAddFrom>
          </Modal.Window>
          <Modal.Open opens="addTagsModal" fun={(e) => e.preventDefault()}>
            <Button size="small">
              <HiMiniPencilSquare size={20}></HiMiniPencilSquare>
            </Button>
          </Modal.Open>
        </Modal>
      </Row>
    </StyledQuizDetails>
  );
}

export default QuizEditDetails;
