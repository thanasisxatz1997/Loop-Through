import QuizzesDisplayComponent from "./QuizzesDisplayComponent";

import { useQuizzes } from "./useQuizzes";

function Quizes() {
  const { quizzes, isPending } = useQuizzes();

  if (isPending) return <h1>Loading</h1>;
  return (
    <QuizzesDisplayComponent
      quizzes={quizzes}
      title="Quizzes"
    ></QuizzesDisplayComponent>
  );
}

export default Quizes;
