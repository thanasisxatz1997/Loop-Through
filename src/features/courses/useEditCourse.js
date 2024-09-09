import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "../../services/apiCourses";
import toast from "react-hot-toast";

export function useEditCourse() {
  const queryClient = useQueryClient();

  const { mutate: editCourse, isPending: isEditingCourse } = useMutation({
    mutationFn: (course) => updateCourse(course),
    onSuccess: () => {
      toast.success("Course successfully updated");
      queryClient.invalidateQueries({ queryKey: ["userCourses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editCourse, isEditingCourse };
}
