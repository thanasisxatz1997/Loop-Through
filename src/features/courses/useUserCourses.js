import { useQuery } from "@tanstack/react-query";
import { getCoursesByAuthorId } from "../../services/apiCourses";

export function useUserCourses(authorId) {
  const {
    isPending,
    data: userCourses,
    error,
  } = useQuery({
    queryKey: ["userCourses"],
    queryFn: () => getCoursesByAuthorId(authorId),
  });
  return { userCourses, isPending };
}
