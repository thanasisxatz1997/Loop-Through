import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteLessonRequest } from "../../services/apiLessons";
import { useNavigate } from "react-router";

export function useDeleteLesson() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteLesson, isPending: isDeleting } = useMutation({
    mutationFn: (lessonId) => deleteLessonRequest(lessonId),
    onSuccess: () => {
      toast.success("Lesson successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      navigate("");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message);
      throw new Error(err);
    },
  });

  return [deleteLesson, isDeleting];
}
