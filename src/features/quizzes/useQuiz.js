import { useQuery } from "@tanstack/react-query";
import { getQuizById, getQuizzes } from "../../services/apiQuizzes";

export function useQuiz(quizId) {
  const {
    isPending,
    data: quiz,
    error,
  } = useQuery({
    queryKey: ["quiz"],
    queryFn: () => getQuizById(quizId),
  });
  return { quiz, isPending };
}
