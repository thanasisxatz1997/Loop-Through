import { useEffect, useState } from "react";
import Row from "../../../styles/Row";
import { useQuiz } from "../contexts/QuizContext";
import { useCompleteQuiz } from "../useCompleteQuiz";
import Spinner from "../../../ui/Spinner";
import { completeQuizRequest } from "../../../services/apiQuizzes";

function FinishScreen() {
  const { points, maxPossiblePoints, dispatch, answers, quizId } = useQuiz();
  let emoji;
  console.log(answers);
  console.log(quizId);
  const [completedQuiz, setCompletedQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { completeQuiz, isCompleting } = useCompleteQuiz();

  useEffect(() => {
    const fetchCompletedQuiz = async () => {
      try {
        setIsLoading(true);
        const quizAnswers = { quizId, answers };
        const result = await completeQuizRequest(quizAnswers); // Wait for completion
        setIsLoading(false);
        setCompletedQuiz(result); // Update state with the completed quiz data
      } catch (error) {
        console.error("Error completing quiz:", error);
      }
    };

    fetchCompletedQuiz();
  }, [answers, quizId]);

  if (completedQuiz?.score >= 90 && completedQuiz?.score <= 100) emoji = "🥇";
  else if (completedQuiz?.score >= 70 && completedQuiz?.score < 100)
    emoji = "🥈";
  else if (completedQuiz?.score >= 50 && completedQuiz?.score < 100)
    emoji = "🥉";

  console.log(completedQuiz);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  // if (!completedQuiz) {
  //   return <div>Error while completing quiz.</div>;
  // }

  return (
    <Row type="vertical">
      <p className="result">
        <span>{emoji}</span>You scored <strong>{completedQuiz?.points}</strong>{" "}
        out of {maxPossiblePoints} ({Math.ceil(completedQuiz?.score)}%)
      </p>
      <p className="highscore">
        (Highscore: {completedQuiz?.totalPoints} points)
      </p>
      <Row content="end">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart quiz
        </button>
      </Row>
    </Row>
  );
}

export default FinishScreen;
