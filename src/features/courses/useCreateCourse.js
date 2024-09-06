import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "../../services/apiCourses";
import toast from "react-hot-toast";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  const { mutate: createNewCourse, isPending: isCreatingCourse } = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success("New course successfully created.");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["userCourses"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createNewCourse, isCreatingCourse };
}
