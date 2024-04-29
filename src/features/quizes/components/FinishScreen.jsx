import Row from "../../../styles/Row";
import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage >= 90 && percentage <= 100) emoji = "🥇";
  else if (percentage >= 70 && percentage < 100) emoji = "🥈";
  else if (percentage >= 50 && percentage < 100) emoji = "🥉";

  return (
    <Row type="vertical">
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
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
