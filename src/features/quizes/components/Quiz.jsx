import React from "react";
import "./quizComponentStyles.css";
import QuizLayout from "./QuizLayout.jsx";
import { QuizProvider } from "../contexts/QuizContext.jsx";
import styled from "styled-components";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<React.StrictMode></React.StrictMode>);

const QuizContainer = styled.div`
  background-color: var(--bg-color-light-0);
  height: 100%;
  padding: 5rem 2rem;
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
