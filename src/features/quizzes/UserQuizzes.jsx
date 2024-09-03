import QuizesDisplayComponent from "./QuizzesDisplayComponent";
import { useUserQuizzes } from "./useUserQuizzes";

function UserQuizzes() {
  const { userQuizzes, isPending } = useUserQuizzes();

  if (isPending) return <h1>Loading</h1>;

  return (
    <QuizesDisplayComponent
      quizzes={userQuizzes}
      title="My Quizzes"
      edit={true}
    ></QuizesDisplayComponent>
  );
}

export default UserQuizzes;
