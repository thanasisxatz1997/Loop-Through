import { useQuery } from "@tanstack/react-query";
import { getQuizzesByAuthorId } from "../../services/apiQuizzes";

export function useUserQuizzes() {
  const {
    isPending,
    data: userQuizzes,
    error,
  } = useQuery({
    queryKey: ["userQuizzes"],
    queryFn: () => getQuizzesByAuthorId("73276920-094a-4985-9402-5453821db434"),
  });
  return { userQuizzes, isPending };
}
