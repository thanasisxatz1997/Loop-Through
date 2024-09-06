import { useParams } from "react-router";
import { useUser } from "../features/authentication/useUser";
import Heading from "../styles/Heading";
import { useQuiz } from "../features/quizzes/useQuiz";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import StyledFormTextInput from "../styles/StyledFormTextInput";
import Row from "../styles/Row";
import SelectBox from "../ui/SelectBox";
import { useState } from "react";
import Button from "../styles/StyledButton";
import { HiPencilSquare, HiMiniTrash, HiNoSymbol } from "react-icons/hi2";
import { useDeleteQuiz } from "../features/quizzes/useDeleteQuiz";
import { HiMiniPlusCircle } from "react-icons/hi2";
import Modal from "../ui/Modal";
import CreateQuestionForm from "../features/quizzes/CreateQuestionForm";
import { useEditQuiz } from "../features/quizzes/useEditQuiz";
import DeleteConfirmation from "../ui/DeleteConfirmation";

const StyledQuizzesContainer = styled.div`
  background-color: var(--bg-color-light-0);
  height: 100%;
`;

const StyledQuizzesMainContainer = styled.main`
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const StyledQuizList = styled.ul`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: #ffffffd1;
  min-width: 50rem;
`;

const StyledSettingsMain = styled.main`
  border-radius: 10px;

  /* height: 50vh; */
  width: 100vh;
  padding: 3rem;
`;

const StyledAccordionItem = styled.div`
  background-color: white;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  padding: 1px 5px;
  padding-right: 16px;
  cursor: pointer;
  border-top: 4px solid #fff;
  border-bottom: 4px solid #fff;

  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 24px;
  row-gap: 32px;
  align-items: center;
`;

const StyledAccordionTitle = styled.p`
  font-size: 16px;
  font-weight: 200;
`;

const StyledAccordionContent = styled.div`
  cursor: none;
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
    console.log("New quiz Data:", newQuiz);
    editQuiz(newQuiz);
  }

  function handleDeleteQuestion(index) {
    // e.stopPropagation();
    // e.preventDefault();
    console.log("question to delete:", index);
    const newQuestions = quiz.questions.filter((question, i) => i !== index);
    console.log("new Questions:", newQuestions);
    const newQuiz = { ...quiz, questions: newQuestions };
    console.log("The new quiz will be: ", newQuiz);
    editQuiz(newQuiz);
  }

  if (isQuizPending || isUserPending) return <Spinner></Spinner>;
  if (!isAuthenticated) return <Heading> Unauthorized</Heading>;
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
          <StyledQuizList>
            {quiz.questions.map((question, i) => (
              <Row type="vertical" gap="50px" margin="10px" key={i}>
                <AccordionItem
                  curOpen={curOpen}
                  onOpen={setCurOpen}
                  title={question.question}
                  num={i}
                  key={i}
                  setCurrentQuestion={setCurrentQuestion}
                >
                  <Row
                    key={question.question}
                    type="vertical"
                    margin="10px 0px"
                  >
                    <Row content="start" gap="10px">
                      <h4>Question:</h4>
                      <StyledFormTextInput
                        defaultValue={question.question}
                      ></StyledFormTextInput>
                    </Row>
                    <h4>Options:</h4>
                    <Row type="vertical" margin="0px 50px ">
                      {question.options.map((option, i) => (
                        <Row key={i} content="start" gap="10px">
                          <Heading as="h4">{i}</Heading>
                          <StyledFormTextInput
                            defaultValue={option}
                          ></StyledFormTextInput>
                        </Row>
                      ))}
                      <></>
                    </Row>
                    <Row content="start" gap="10px">
                      <h4>Correct Option:</h4>
                      <SelectBox></SelectBox>
                    </Row>
                    <Row content="start" gap="10px">
                      <h4>Points:</h4>
                      <StyledFormTextInput
                        defaultValue={question.points}
                      ></StyledFormTextInput>
                    </Row>
                    <hr></hr>
                  </Row>
                </AccordionItem>
              </Row>
            ))}
            <Row content="center">
              <Modal.Open opens="createQuestionModal">
                <Button variation="transparent" size="small" shadow="none">
                  <Row>
                    <HiMiniPlusCircle size={15}></HiMiniPlusCircle>
                    New Question
                  </Row>
                </Button>
              </Modal.Open>
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
            </Row>
          </StyledQuizList>
        </StyledQuizzesMainContainer>
      </Modal>
    </StyledQuizzesContainer>
  );
}

function AccordionItem({
  num,
  title,
  curOpen,
  onOpen,
  children,
  setCurrentQuestion,
}) {
  const isOpen = num === curOpen;
  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  function handleDeleteClick(e) {
    console.log("IM CLICKED");
    e.stopPropagation();
    e.preventDefault();
    setCurrentQuestion((cur) => num);
  }

  return (
    <StyledAccordionItem
      className={` ${isOpen ? "open" : ""}`}
      onClick={handleToggle}
    >
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <StyledAccordionTitle className="">{title}</StyledAccordionTitle>
      <Row gap="1rem" content="flex-end">
        <Modal.Open
          opens="deleteQuestionModal"
          fun={(e) => handleDeleteClick(e)}
        >
          <Button
            variation="danger"
            size="small"
            onClick={(e) => handleDeleteClick(e)}
          >
            <HiMiniTrash size={20}></HiMiniTrash>
          </Button>
        </Modal.Open>

        <p className="icon">{isOpen ? "-" : "+"}</p>
      </Row>

      {isOpen && (
        <div onClick={(e) => e.stopPropagation()} className="content-box">
          {children}
        </div>
      )}
    </StyledAccordionItem>
  );
}

export default EditQuizPage;
