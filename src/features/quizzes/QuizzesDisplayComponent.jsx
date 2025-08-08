import styled from "styled-components";
import Row from "../../styles/Row";

import Heading from "../../styles/Heading";
import {
  HiMiniChevronUpDown,
  HiPencilSquare,
  HiMiniPlusCircle,
  HiCheck,
} from "react-icons/hi2";

import SelectBox from "../../ui/SelectBox";

import SearchBar from "../../ui/SearchBar";
import { Link } from "react-router-dom";
import Button from "../../styles/StyledButton";
import Modal from "../../ui/Modal";

import CreateQuizForm from "./CreateQuizForm";
import { useUser } from "../authentication/useUser";
import { useUserData } from "../../hooks/user/useUserData";
import Spinner from "../../ui/Spinner";
import { useState } from "react";

const StyledQuizzesContainer = styled.div`
  /* background-color: var(--bg-color-light-0); */
  height: 92vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    /* Transparent white overlay */ url("/r31.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
  padding: 2rem;
  border-radius: 10px;
  background: var(--color-grey-0);
  min-width: 50rem;
  box-shadow: 5px 8px 12px 3px var(--color-grey-700);
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
  { value: "Medium", name: "Medium" },
  { value: "Hard", name: "Hard" },
  { value: "All", name: "All" },
];

const statusOptions = [
  { value: "Completed", name: "Completed" },
  { value: "Unsolved", name: "Unsolved" },
  { value: "All", name: "All" },
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
  const {
    user,
    isPending: isPendingUser,
    isAuthenticated,
    isFetching: isFetchingUser,
  } = useUser();

  const [searchText, setSearchText] = useState("");
  const [searchedDifficulty, setSearchedDifficulty] = useState("");
  const [searchedStatus, setSearchedStatus] = useState("");

  const { userData, isLoadingUserData } = useUserData(user?.id);

  function hasCompletedQuiz(quizId) {
    if (userData?.completedQuizzes?.find((quiz) => quiz.quizId === quizId)) {
      return true;
    } else {
      return false;
    }

    return userData?.completedQuizzes?.find((quiz) => quiz.quizId === quizId);
  }

  const displayedQuizzes = checkFilters();

  function checkFilters() {
    return quizzes
      .filter(checkSearchTextFilter)
      .filter(checkStatusFilter)
      .filter(checkDifficultyFilter);
  }

  function checkSearchTextFilter(quiz) {
    if (searchText !== "") {
      return quiz.name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
        ? quiz
        : null;
    } else {
      return quiz;
    }
  }

  function checkStatusFilter(quiz) {
    if (searchedStatus === "Completed") {
      return hasCompletedQuiz(quiz.id) ? quiz : null;
    } else if (searchedStatus === "Unsolved") {
      return !hasCompletedQuiz(quiz.id) ? quiz : null;
    }
    return quiz;
  }

  function checkDifficultyFilter(quiz) {
    if (!searchedDifficulty || searchedDifficulty === "All") {
      return quiz;
    }
    return quiz.difficulty === searchedDifficulty ? quiz : null;
  }

  if (isPendingUser || isFetchingUser || isLoadingUserData) {
    return <Spinner></Spinner>;
  }

  function getQuizRating(quizId) {
    return userData?.completedQuizzes?.find((quiz) => quiz.quizId === quizId)
      .score;
  }

  return (
    <StyledQuizzesContainer>
      <StyledQuizzesMainContainer>
        <StyledQuizList>
          <Row type="vertical" gap="3rem">
            <Row content="center">
              <Heading>{title}</Heading>
            </Row>
            <Row content="start" gap="10px">
              <SelectBox
                options={dificultyOptions}
                selectTitle="Dificulty"
                value={searchedDifficulty}
                onChange={(e) => setSearchedDifficulty(e.target.value)}
              ></SelectBox>
              <SelectBox
                options={statusOptions}
                value={searchedStatus}
                selectTitle="Status"
                onChange={(e) => setSearchedStatus(e.target.value)}
              ></SelectBox>
              {/* <SelectBox options={tagsOptions} selectTitle="Tags"></SelectBox> */}
              <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
              ></SearchBar>
            </Row>
            <StyledTable>
              <StyledThead>
                <StyledTr>
                  <StyledTh>
                    <Row margin="0px 5px 0px 0px">
                      Title <HiMiniChevronUpDown />
                    </Row>
                  </StyledTh>
                  <StyledTh>
                    <Row margin="0px 5px 0px 0px">
                      Status <HiMiniChevronUpDown />
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
                {displayedQuizzes.map((quiz) => (
                  <StyledTr key={quiz.id}>
                    <StyledTd>
                      <StyledLink to={`/quiz/${quiz.id}`}>
                        {quiz.name}
                      </StyledLink>
                    </StyledTd>
                    <StyledTd>
                      {edit ? (
                        "Created"
                      ) : !hasCompletedQuiz(quiz.id) ? (
                        "Unsolved"
                      ) : (
                        <div style={{ color: "var(--color-brand-500)" }}>
                          <HiCheck></HiCheck>
                          {`Completed! Best score: 
                          ${Math.ceil(getQuizRating(quiz.id))}`}
                          %
                        </div>
                      )}
                    </StyledTd>
                    <StyledTd>
                      {quiz.difficulty === "Easy" ? (
                        <div style={{ color: "green" }}>Easy</div>
                      ) : quiz.difficulty === "Medium" ? (
                        <div style={{ color: "orange" }}>Medium</div>
                      ) : quiz.difficulty === "Hard" ? (
                        <div style={{ color: "red" }}>Hard</div>
                      ) : (
                        quiz.difficulty
                      )}
                    </StyledTd>
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
          </Row>
          {edit && (
            <Modal>
              <Row content="center">
                <Modal.Open opens="newQuizModal">
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
                    user={user}
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

function TestFun({ onCloseModal }) {
  return <div>TEST</div>;
}

export default QuizzesDisplayComponent;
