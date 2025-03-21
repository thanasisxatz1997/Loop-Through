import { useForm } from "react-hook-form";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import Button from "../../styles/StyledButton";
import StyledFormLabel from "../../styles/StyledFormLabel";
import StyledFormTextArea from "../../styles/StyledFormTextArea";
import StyledFormTextInput from "../../styles/StyledFormTextInput";
import {
  HiPencilSquare,
  HiMiniTrash,
  HiNoSymbol,
  HiMiniPlusCircle,
} from "react-icons/hi2";
import SelectBox from "../../ui/SelectBox";
import Modal from "../../ui/Modal";

function CreateQuestionForm({ onCloseModal, handleUpdateQuiz, quiz }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      options: [],
      points: 10,
      //   content: startingContent ? startingContent.content : "",
      //   size: startingContent ? startingContent.size : "",
    },
  });

  const { errors } = formState;

  const options = watch("options");

  function onSubmit(data) {
    // onLessonEdited({ type: "t", ...data });
    const formatedData = {
      question: data.question,
      options: data.options,
      points: Number(data.points),
      correctOption: Number(data.correctOption),
    };
    const newQuestions = [...quiz.questions, formatedData];
    const newQuiz = { ...quiz, questions: newQuestions };
    handleUpdateQuiz(newQuiz);
    onCloseModal?.();
  }

  function onError(errors) {
    console.log(errors);
  }

  function handleNewOptionClick(e) {
    e.preventDefault();
    const currentOptions = getValues().options;

    setValue("options", [...currentOptions, ""]);
  }

  function handleDeleteOptionClick(e, i) {
    e.preventDefault();
    const currentOptions = getValues().options;
    const newOptions = currentOptions.filter((option, index) => index !== i);
    setValue("options", newOptions);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Row type="vertical">
        <Row content="center">
          <Heading as="h2">New Question:</Heading>
        </Row>
        <StyledFormTextArea
          id="question"
          name="question"
          placeholder="Question"
          width="500px"
          height="100px"
          {...register(`question`)}
        ></StyledFormTextArea>
        <Heading as="h3">Options:</Heading>
        <Row type="vertical" margin="0px 50px ">
          {getValues().options.map((option, i) => (
            <Row key={i} content="start" gap="10px">
              <Heading as="h4">{i}</Heading>
              <StyledFormTextInput
                {...register(`options.${i}`)}
                defaultValue={option}
                placeholder={`Option ${i + 1}`}
              ></StyledFormTextInput>
              <Button
                variation="danger"
                size="small"
                onClick={(e) => handleDeleteOptionClick(e, i)}
              >
                <HiNoSymbol size={15}></HiNoSymbol>
              </Button>
            </Row>
          ))}
          <Button
            variation="transparent"
            size="small"
            shadow="none"
            onClick={(e) => handleNewOptionClick(e)}
          >
            <Row content="center">
              <HiMiniPlusCircle size={15}></HiMiniPlusCircle>
              New Option
            </Row>
          </Button>
        </Row>
        <Row content="start" gap="10px">
          <h4>Correct Option:</h4>
          <SelectBox
            selectTitle="Select Size"
            options={getValues().options.map((option, i) => ({
              value: i,
              name: i,
            }))}
            id="correctOption"
            name="correctOption"
            {...register("correctOption", {
              required: "This field is required",
            })}
          ></SelectBox>
        </Row>
        <Row content="start" gap="10px">
          <h4>Points:</h4>
          <StyledFormTextInput
            enableMobileNumericKeyboard
            type="number"
            min="10"
            max="100"
            step="10"
            width="70px"
            {...register(`points`)}
            placeholder={`Points`}
          ></StyledFormTextInput>
        </Row>
        <Row content="start" gap="1rem">
          <Button variation="success">Create</Button>
          <Button variation="danger" onClick={onCloseModal}>
            Cancel
          </Button>
        </Row>
      </Row>
    </form>
  );
}

export default CreateQuestionForm;
