import { useQuery } from "@tanstack/react-query";
import { getQuizzes } from "../../services/apiQuizzes";

export function useQuizzes() {
  const {
    isPending,
    data: quizzes,
    error,
  } = useQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzes,
  });
  return { quizzes, isPending };
}
