import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizContext";
import Row from "../../../styles/Row";
import styled from "styled-components";

const StyledQuizLayout = styled.div`
  border: solid 1px;
  padding: 5rem;
  border-radius: 20px;
  background-color: var(--color-grey-100);
  box-shadow: 5px 8px 12px 3px var(--color-grey-700);
`;

function QuizLayout() {
  const { status } = useQuiz();

  return (
    <StyledQuizLayout>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <Row type="vertical">
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </Row>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </StyledQuizLayout>
  );
}

export default QuizLayout;

//https://my-json-server.typicode.com/thanasisxatz1997/FakeServer/questions
