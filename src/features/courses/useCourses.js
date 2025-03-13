import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../services/apiCourses";

export function useCourses() {
  const {
    data: courses,
    isPending: isLoadingCourses,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  console.log("Fetching courses:", courses);
  return { courses, isLoadingCourses, error };
}
