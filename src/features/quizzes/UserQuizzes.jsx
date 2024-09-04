import { useMutation, useQueryClient } from "@tanstack/react-query";
import QuizesDisplayComponent from "./QuizzesDisplayComponent";
import { useUserQuizzes } from "./useUserQuizzes";
import { createQuiz } from "../../services/apiQuizzes";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";

function UserQuizzes() {
  const queryClient = useQueryClient();

  const { mutate: createNewQuiz, isLoading: isCreatingCourse } = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      toast.success("New course successfully created.");
      queryClient.invalidateQueries({ queryKey: ["userQuizzes"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { userQuizzes, isPending, error } = useUserQuizzes();
  console.log("THEEEEEEE USER QUIZZES:", userQuizzes);
  if (isPending) return <Spinner></Spinner>;
  if (error) console.log(error);

  return (
    <QuizesDisplayComponent
      createNewQuiz={createNewQuiz}
      quizzes={userQuizzes}
      title="My Quizzes"
      edit={true}
    ></QuizesDisplayComponent>
  );
}

export default UserQuizzes;
