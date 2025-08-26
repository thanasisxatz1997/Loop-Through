import { useForm } from "react-hook-form";
import styled from "styled-components";
import SelectBox from "../../ui/SelectBox";
import { useQuizzes } from "../../features/quizzes/useQuizzes";
import Row from "../../styles/Row";
import StyledFormLabel from "../../styles/StyledFormLabel";
import StyledButton from "../../styles/StyledButton";
import { useState } from "react";

const StyledFormContainer = styled.form`
  min-height: 150px;
  background-color: var(--color-gray-50);
  padding: 10px;
`;

function QuizLinkCreateEditForm({
  startingContent,
  onCloseModal,
  onLessonEdited,
  isEditing,
}) {
  const [selectedQuiz, setSelectedQuiz] = useState();
  const { register, handleSubmit, reset, getValues, setValue, formState } =
    useForm({
      defaultValues: {
        quizId: startingContent ? startingContent.quizId : "",
      },
    });

  const { errors } = formState;

  const { quizzes, isPending } = useQuizzes();
  console.log(quizzes);

  function onError(errors) {
    console.log(errors);
  }

  function onSubmit(data) {
    const quizName = quizzes?.find(
      (quiz) => getValues().quizId === quiz?.id
    ).name;
    onLessonEdited({ type: "quizLink", quizName: quizName, ...data });
    console.log({ type: "quizLink", quizName: quizName, ...data });
    onCloseModal?.();
  }

  return (
    <StyledFormContainer onSubmit={handleSubmit(onSubmit, onError)}>
      <Row content="flex-start" gap="10px" margin="10px 0px">
        <StyledFormLabel>Select quiz:</StyledFormLabel>
        <SelectBox
          id="quizId"
          name="quizId"
          style={{ maxWidth: "400px" }}
          selectTitle="Select Quiz"
          options={quizzes?.map((quiz) => ({
            value: quiz.id,
            name: quiz.name,
          }))}
          {...register("quizId", { required: "This field is required" })}
        ></SelectBox>
      </Row>
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

export default QuizLinkCreateEditForm;
