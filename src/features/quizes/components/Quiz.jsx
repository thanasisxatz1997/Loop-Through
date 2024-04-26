import React from "react";
import "./index.css";
import QuizLayout from "./QuizLayout.jsx";
import { QuizProvider } from "../contexts/QuizContext.jsx";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<React.StrictMode></React.StrictMode>);

function Quiz() {
  return (
    <div>
      <QuizProvider>
        <QuizLayout />
      </QuizProvider>
    </div>
  );
}

export default Quiz;
