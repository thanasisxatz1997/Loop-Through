import React from "react";
import "./quizComponentStyles.css";
import QuizLayout from "./QuizLayout.jsx";
import { QuizProvider } from "../contexts/QuizContext.jsx";
import styled from "styled-components";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<React.StrictMode></React.StrictMode>);

const QuizContainer = styled.div`
  background-color: var(--color-grey-100);
  height: 100%;
`;

function Quiz() {
  return (
    <QuizContainer>
      <QuizProvider>
        <QuizLayout />
      </QuizProvider>
    </QuizContainer>
  );
}

export default Quiz;
