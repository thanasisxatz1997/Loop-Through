import { useEffect, useState } from "react";
import Row from "../../../styles/Row";
import { useQuiz } from "../contexts/QuizContext";
import { useCompleteQuiz } from "../useCompleteQuiz";
import Spinner from "../../../ui/Spinner";
import { completeQuizRequest } from "../../../services/apiQuizzes";

function FinishScreen() {
  const { points, maxPossiblePoints, dispatch, answers, quizId, highscore } =
    useQuiz();
  let emoji;
  const [completedQuiz, setCompletedQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { completeQuiz, isCompleting } = useCompleteQuiz();
  console.log(points, highscore);
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

  if (points >= 90 && points <= 100) emoji = "🥇";
  else if (points >= 70 && points < 100) emoji = "🥈";
  else if (points >= 50 && points < 100) emoji = "🥉";

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  // if (!completedQuiz) {
  //   return <div>Error while completing quiz.</div>;
  // }

  return (
    <Row type="vertical">
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil((points / maxPossiblePoints) * 100)}%)
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
