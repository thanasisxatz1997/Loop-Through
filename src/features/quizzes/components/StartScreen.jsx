import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { numQuestions, dispatch, quizName } = useQuiz();
  return (
    <div className="start">
      <h2>{quizName}</h2>
      <h3>{numQuestions} questions</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
