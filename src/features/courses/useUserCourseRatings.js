import { useQuery } from "@tanstack/react-query";
import { getUserCourseRatings } from "../../services/apiRatings";

export function useUserCourseRatings(userId) {
  const {
    isPending,
    data: userCourseRatings,
    error,
  } = useQuery({
    queryKey: ["userCourseRatings"],
    queryFn: () => getUserCourseRatings(userId),
  });
  return { userCourseRatings, isPending };
}
