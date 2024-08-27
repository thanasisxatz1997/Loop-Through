import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteLesson() {
  const queryClient = useQueryClient();

  const { mutate: deleteLesson, isPending: isDeleting } = useMutation({
    mutationFn: (lessonId) => deleteLesson(lessonId),
    onSuccess: () => {
      toast.success("Lesson successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message);
      throw new Error(err);
    },
  });

  return [deleteLesson, isDeleting];
}
