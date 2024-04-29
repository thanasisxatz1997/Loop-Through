import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";
import styled from "styled-components";
import Heading from "../../../styles/Heading";

const StyledTimer = styled.div`
  float: left;
  font-size: 1.8rem;
  color: var(--color-medium);
  border: 2px solid var(--color-dark);
  padding: 1.35rem 2.8rem;
  border-radius: 100px;
`;

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <StyledTimer>
      <Heading as="h3">
        {mins < 10 ? `0${mins}` : mins}:{secs < 10 ? `0${secs}` : secs}
      </Heading>
    </StyledTimer>
  );
}

export default Timer;
