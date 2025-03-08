import { useQuery } from "@tanstack/react-query";
import { getUserQuizRatings } from "../../services/apiRatings";

export function useUserQuizRatings(userId) {
  const {
    isPending,
    data: userQuizRatings,
    error,
  } = useQuery({
    queryKey: ["userQuizRatings"],
    queryFn: () => getUserQuizRatings(userId),
  });
  return { userQuizRatings, isPending };
}
