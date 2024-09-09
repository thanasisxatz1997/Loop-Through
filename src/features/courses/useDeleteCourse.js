import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourseRequest } from "../../services/apiCourses";
import toast from "react-hot-toast";

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const { mutate: deleteCourse, isPending: isDeletingCourse } = useMutation({
    mutationFn: deleteCourseRequest,
    onSuccess: () => {
      toast.success("Course successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["userCourses"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteCourse, isDeletingCourse };
}
