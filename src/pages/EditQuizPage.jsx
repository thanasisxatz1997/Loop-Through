import { useParams } from "react-router";
import { useUser } from "../features/authentication/useUser";
import Heading from "../styles/Heading";
import { useQuiz } from "../features/quizzes/useQuiz";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import Row from "../styles/Row";
import { useState } from "react";
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

const StyledQuizzesContainer = styled.div`
  background-color: var(--bg-color-light-0);
  height: 100%;
`;

const StyledQuizzesMainContainer = styled.div`
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

  function handleUpdateQuiz(newQuiz) {
    editQuiz(newQuiz);
  }

  function handleSaveTags(newTags) {
    const newQuiz = { ...quiz, tags: newTags };
    handleUpdateQuiz(newQuiz);
  }

  function handleDeleteQuestion(index) {
    const newQuestions = quiz.questions.filter((question, i) => i !== index);
    const newQuiz = { ...quiz, questions: newQuestions };
    editQuiz(newQuiz);
  }

  if (isQuizPending || isUserPending || isDeleting || isEditing)
    return <Spinner></Spinner>;
  if (!isAuthenticated) return <Heading>Unauthorized</Heading>;
  return (
    <StyledQuizzesContainer>
      <Modal>
        <StyledQuizzesMainContainer>
          <Row gap="30px">
            <Heading as="h1">{quiz.name}</Heading>
            <Row gap="5px">
              <Button variation="success" size="medium">
                <Row gap="3px">
                  <p>Save </p>
                  <HiPencilSquare size={15}></HiPencilSquare>
                </Row>
              </Button>
              <Button variation="primary" size="medium">
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
            <QuizEditDetails quiz={quiz}></QuizEditDetails>
            <QuizEditQuestionList
              quiz={quiz}
              curOpen={curOpen}
              setCurOpen={setCurOpen}
              handleDeleteQuestion={handleDeleteQuestion}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              handleUpdateQuiz={handleUpdateQuiz}
              handleSaveTags={handleSaveTags}
            ></QuizEditQuestionList>
          </Row>
        </StyledQuizzesMainContainer>
        <Modal.Window name="createQuestionModal">
          <CreateQuestionForm
            handleUpdateQuiz={handleUpdateQuiz}
            quiz={quiz}
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
