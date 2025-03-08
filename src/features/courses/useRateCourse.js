import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { rateCourseRequest } from "../../services/apiRatings";

export function useRateCourse() {
  const queryClient = useQueryClient();

  const { mutate: rateCourse, isPending: isRatingCourse } = useMutation({
    mutationFn: rateCourseRequest,
    onSuccess: () => {
      toast.success("Course Rated successfully!.");
      queryClient.invalidateQueries({ queryKey: ["userCourseRatings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { rateCourse, isRatingCourse };
}
