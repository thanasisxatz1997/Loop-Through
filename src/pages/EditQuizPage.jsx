import { useParams } from "react-router";
import { useUser } from "../features/authentication/useUser";
import Heading from "../styles/Heading";
import { useQuiz } from "../features/quizzes/useQuiz";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import Row from "../styles/Row";
import { useEffect, useState } from "react";
import Button from "../styles/StyledButton";
import {
  HiPencilSquare,
  HiMiniTrash,
  HiNoSymbol,
  HiMiniPencilSquare,
} from "react-icons/hi2";
import { useDeleteQuiz } from "../features/quizzes/useDeleteQuiz";
import Modal from "../ui/Modal";
import CreateQuestionForm from "../features/quizzes/CreateQuestionForm";
import { useEditQuiz } from "../features/quizzes/useEditQuiz";
import DeleteConfirmation from "../ui/DeleteConfirmation";
import TagsAddFrom from "../ui/TagsAddFrom";
import QuizEditDetails from "../features/quizzes/QuizEditDetails";
import QuizEditQuestionList from "../features/quizzes/QuizEditQuestionList";
import { useForm } from "react-hook-form";

const StyledQuizzesContainer = styled.div`
  background-color: var(--bg-color-light-0);
  height: 100%;
`;

const StyledQuizzesMainContainer = styled.form`
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

function EditQuizPage() {
  const quizId = useParams();

  const [curOpen, setCurOpen] = useState(null);
  const { quiz, isPending: isQuizPending } = useQuiz(quizId);
  const { isAuthenticated, user, isPending: isUserPending } = useUser();
  const { deleteQuiz, isDeleting } = useDeleteQuiz();
  const { editQuiz, isEditing } = useEditQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState,
    onError,
    watch,
  } = useForm({
    defaultValues: {
      name: quiz ? quiz.name : "",
      description: quiz ? quiz.description : "",
      difficulty: quiz ? quiz.difficulty : "",
      tags: quiz ? quiz.tags : [],
      questions: quiz ? quiz.questions : [],
    },
  });
  const { errors } = formState;

  function handleSaveTags(newTags) {
    console.log("New tags received:", newTags);
    setValue("tags", newTags);
  }

  function handleDeleteQuestion(index) {
    const newQuestions = quiz.questions.filter((question, i) => i !== index);
    const newQuiz = { ...quiz, questions: newQuestions };
    editQuiz(newQuiz);
  }

  function onSubmit(data) {
    const newQuiz = { ...quiz, ...data };
    console.log("ON SUBMIT", newQuiz);
    editQuiz(newQuiz);
  }

  function onCancel(e) {
    e.stopPropagation();
    e.preventDefault();
    reset({
      name: quiz.name,
      description: quiz.description,
      difficulty: quiz.difficulty,
      tags: quiz.tags || [],
      questions: quiz.questions || [],
    });
  }

  useEffect(() => {
    if (quiz) {
      reset({
        name: quiz.name,
        description: quiz.description,
        difficulty: quiz.difficulty,
        tags: quiz.tags || [],
        questions: quiz.questions || [],
      });
    }
  }, [quiz, reset]);

  if (isQuizPending || isUserPending || isDeleting || isEditing)
    return <Spinner></Spinner>;
  if (!isAuthenticated) return <Heading>Unauthorized</Heading>;
  return (
    <StyledQuizzesContainer>
      <Modal>
        <StyledQuizzesMainContainer onSubmit={handleSubmit(onSubmit, onError)}>
          <Row gap="30px">
            <Heading as="h1">{quiz.name}</Heading>
            <Row gap="5px">
              <Button variation="success" size="medium">
                <Row gap="3px">
                  <p>Save </p>
                  <HiPencilSquare size={15}></HiPencilSquare>
                </Row>
              </Button>
              <Button variation="primary" size="medium" onClick={onCancel}>
                <Row gap="3px">
                  <p>Cancel</p>
                  <HiNoSymbol size={15}></HiNoSymbol>
                </Row>
              </Button>
              <Button
                variation="danger"
                size="medium"
                onClick={() => {
                  console.log("in the component", quizId);
                  deleteQuiz(quizId.id);
                }}
              >
                <Row gap="3px">
                  <p>Delete</p>
                  <HiMiniTrash size={15}></HiMiniTrash>
                </Row>
              </Button>
            </Row>
          </Row>
          <Row content="start">
            <QuizEditDetails
              register={register}
              setValue={setValue}
              getValues={getValues}
              handleSaveTags={handleSaveTags}
              quiz={quiz}
              currentTags={watch("tags")}
            ></QuizEditDetails>
            <QuizEditQuestionList
              quiz={quiz}
              curOpen={curOpen}
              setCurOpen={setCurOpen}
              handleDeleteQuestion={handleDeleteQuestion}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              questions={watch("questions")}
              setValue={setValue}
              watch={watch}
              getValues={getValues}
            ></QuizEditQuestionList>
          </Row>
        </StyledQuizzesMainContainer>
        <Modal.Window name="createQuestionModal">
          <CreateQuestionForm
            quiz={quiz}
            handleUpdateQuiz={editQuiz}
          ></CreateQuestionForm>
        </Modal.Window>
        <Modal.Window name="deleteQuestionModal">
          <DeleteConfirmation
            onConfirm={() => handleDeleteQuestion(currentQuestion)}
          ></DeleteConfirmation>
        </Modal.Window>
        <Modal.Window name="addTagsModal">
          <TagsAddFrom
            usedTags={quiz.tags}
            handleSaveTags={handleSaveTags}
          ></TagsAddFrom>
        </Modal.Window>
      </Modal>
    </StyledQuizzesContainer>
  );
}

export default EditQuizPage;
