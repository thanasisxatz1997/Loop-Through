import { HiMiniPlusCircle, HiMiniTrash } from "react-icons/hi2";
import Heading from "../../styles/Heading";
import Row from "../../styles/Row";
import Button from "../../styles/StyledButton";
import StyledFormTextInput from "../../styles/StyledFormTextInput";
import Modal from "../../ui/Modal";
import SelectBox from "../../ui/SelectBox";
import styled from "styled-components";
import { useState } from "react";
import StyledFormTextArea from "../../styles/StyledFormTextArea";

const StyledQuizList = styled.ul`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: #ffffffd1;
  min-width: 50rem;
`;

const StyledAccordionItem = styled.div`
  background-color: white;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  padding: 1px 5px;
  padding-right: 16px;
  cursor: pointer;
  border-top: 4px solid #fff;
  border-bottom: 4px solid #fff;
  user-select: none;
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

function QuizEditQuestionList({
  quiz,
  curOpen,
  setCurOpen,
  handleDeleteQuestion,
  currentQuestion,
  setCurrentQuestion,
  handleUpdateQuiz,
  handleSaveTags,
  questions,
  setValue,
  getValues,
  watch,
}) {
  function handleQuestionChange(e, index) {
    const prevQuestions = getValues("questions"); // Get current questions array
    setValue(
      "questions",
      questions.map((q, i) =>
        i !== index ? q : { ...q, question: e.target.value }
      )
    );
    // setValue(
    //   "questions",
    //   (prevQuestions) => {
    //     const updatedQuestions = Array.isArray(prevQuestions)
    //       ? [...prevQuestions]
    //       : []; // ✅ Ensure it's an array
    //     updatedQuestions[index] = {
    //       ...updatedQuestions[index],
    //       question: e.target.value,
    //     };
    //     return updatedQuestions;
    //   },
    //   { shouldDirty: true }
    // );
  }

  // function handleBlur() {
  //   setValue("questions", tempQuestions);
  // }
  return (
    <StyledQuizList>
      {questions?.map((question, i) => (
        <Row type="vertical" gap="50px" margin="10px" key={i}>
          <AccordionItem
            curOpen={curOpen}
            onOpen={setCurOpen}
            title={question.question}
            num={i}
            key={i}
            setCurrentQuestion={setCurrentQuestion}
          >
            <Row key={question.question} type="vertical" margin="10px 0px">
              <Row content="start" gap="10px">
                <h4>Question:</h4>

                <StyledFormTextArea
                  style={{ height: "200px" }}
                  defaultValue={question.question}
                  onBlur={(e) => handleQuestionChange(e, i)}
                  // onBlur={handleBlur}
                ></StyledFormTextArea>
              </Row>
              <h4>Options:</h4>
              <Row type="vertical" margin="0px 50px ">
                {question?.options?.map((option, i) => (
                  <Row key={i} content="start" gap="10px">
                    <Heading as="h4">{i}</Heading>
                    <StyledFormTextInput
                      defaultValue={option}
                    ></StyledFormTextInput>
                  </Row>
                ))}
              </Row>
              <Row content="start" gap="10px">
                <h4>Correct Option:</h4>
                <SelectBox
                  options={question?.options?.map((option, i) => ({
                    value: i,
                    name: i,
                  }))}
                ></SelectBox>
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
        <Modal.Open opens="createQuestionModal" fun={(e) => e.preventDefault()}>
          <Button variation="transparent" size="small" shadow="none">
            <Row>
              <HiMiniPlusCircle size={15}></HiMiniPlusCircle>
              New Question
            </Row>
          </Button>
        </Modal.Open>
      </Row>
    </StyledQuizList>
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

export default QuizEditQuestionList;
