import styled from "styled-components";
import Row from "../../styles/Row";

import Heading from "../../styles/Heading";
import {
  HiMiniChevronUpDown,
  HiPencilSquare,
  HiMiniPlusCircle,
} from "react-icons/hi2";

import SelectBox from "../../ui/SelectBox";

import SearchBar from "../../ui/SearchBar";
import { Link } from "react-router-dom";
import Button from "../../styles/StyledButton";
import Modal from "../../ui/Modal";

import CreateQuizForm from "./CreateQuizForm";

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
  background: #ffffff59;
  min-width: 50rem;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const StyledTd = styled.td``;

const StyledTh = styled.th`
  min-width: 25rem;
  text-align: start;
  cursor: pointer;
  user-select: none;
`;

const StyledOptionsTh = styled.th`
  min-width: 10rem;
  text-align: start;
  cursor: pointer;
  user-select: none;
`;

const StyledTr = styled.tr``;

// const StyledTr = styled.tr`
//   &:hover {
//     background-color: var(
//       --color-grey-200
//     ); /* Change this to your desired hover color */
//   }
// `;

const StyledThead = styled.thead`
  border-bottom: 1px solid black;
`;

const StyledLink = styled(Link)`
  color: inherit; /* This will make the link inherit the text color */
  text-decoration: none; /* Removes the underline */

  &:hover {
    color: var(--color-brand-600); /* Change the text color to blue on hover */
  }
`;

const dificultyOptions = [
  { value: "Easy", name: "Easy" },
  { value: "Easy", name: "Medium" },
  { value: "Easy", name: "Hard" },
];

const statusOptions = [
  { value: "Completed", name: "Completed" },
  { value: "Completed", name: "Unsolved" },
];

const tagsOptions = [
  { value: "Algorithms", name: "Algorithms" },
  { value: "Algorithms", name: "React" },
  { value: "Algorithms", name: "Programming" },
];

function QuizzesDisplayComponent({
  quizzes,
  title = "Quizzes",
  edit = false,
  createNewQuiz,
}) {
  console.log("quizzes:", quizzes);
  return (
    <StyledQuizzesContainer>
      <StyledQuizzesMainContainer>
        <Row content="center">
          <Heading>{title}</Heading>
        </Row>
        <Row content="start" gap="10px">
          <SelectBox
            options={dificultyOptions}
            selectTitle="Dificulty"
          ></SelectBox>
          <SelectBox options={statusOptions} selectTitle="Status"></SelectBox>
          <SelectBox options={tagsOptions} selectTitle="Tags"></SelectBox>
          <SearchBar></SearchBar>
        </Row>
        <StyledQuizList>
          {/* {quizzes.map((quiz, i) => (
            <QuizListItem
              key={i}
              name={quiz.name}
              delay={`0.${i * 3}s`}
            ></QuizListItem>
          ))} */}

          <StyledTable>
            <StyledThead>
              <StyledTr>
                <StyledTh>
                  <Row margin="0px 5px 0px 0px">
                    Status <HiMiniChevronUpDown />
                  </Row>
                </StyledTh>
                <StyledTh>
                  <Row margin="0px 5px 0px 0px">
                    Title <HiMiniChevronUpDown />
                  </Row>
                </StyledTh>
                <StyledTh>
                  <Row margin="0px 5px 0px 0px">
                    Difficulty <HiMiniChevronUpDown />
                  </Row>
                </StyledTh>
                {edit && (
                  <StyledOptionsTh>
                    <Row margin="0px 5px 0px 0px">Options</Row>
                  </StyledOptionsTh>
                )}
              </StyledTr>
            </StyledThead>

            <tbody>
              {quizzes.map((quiz) => (
                <StyledTr key={quiz.id}>
                  <StyledTd>
                    <StyledLink to={`/quiz/${quiz.id}`}>{quiz.name}</StyledLink>
                  </StyledTd>
                  <StyledTd>{edit ? "Created" : "Completed"}</StyledTd>
                  <StyledTd>{quiz.difficulty}</StyledTd>
                  {edit && (
                    <StyledTd>
                      <Row margin="0px 5px 0px 0px" content="center">
                        <Link to={`/editQuiz/${quiz.id}`}>
                          <Button size="small">
                            <HiPencilSquare size={15}></HiPencilSquare>
                          </Button>
                        </Link>
                      </Row>
                    </StyledTd>
                  )}
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>
          {edit && (
            <Modal>
              <Row content="center">
                <Modal.Open opens="newQuizModal">
                  {/* <CreateCourseButton>Create a new Course!</CreateCourseButton> */}
                  <StyledLink>
                    <Button variation="transparent" size="small" shadow="none">
                      <Row>
                        <HiMiniPlusCircle size={15}></HiMiniPlusCircle>
                        New Quiz
                      </Row>
                    </Button>
                  </StyledLink>
                </Modal.Open>
                <Modal.Window name="newQuizModal">
                  <CreateQuizForm
                    createNewQuiz={createNewQuiz}
                  ></CreateQuizForm>
                </Modal.Window>
              </Row>
            </Modal>
          )}
        </StyledQuizList>
      </StyledQuizzesMainContainer>
    </StyledQuizzesContainer>
  );
}

export default QuizzesDisplayComponent;
