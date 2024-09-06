import { useQuery } from "@tanstack/react-query";
import { getQuizzesByAuthorId } from "../../services/apiQuizzes";

export function useUserQuizzes(authorId) {
  const {
    isPending,
    data: userQuizzes,
    error,
  } = useQuery({
    queryKey: ["userQuizzes"],
    queryFn: () => getQuizzesByAuthorId(authorId),
  });
  return { userQuizzes, isPending };
}
