import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteLessonRequest } from "../../services/apiLessons";
import { useNavigate } from "react-router";
import { useUser } from "../authentication/useUser";

export function useDeleteLesson() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, isPending, isFetching } = useUser();

  const { mutate: deleteLesson, isPending: isDeleting } = useMutation({
    mutationFn: (lessonId) => deleteLessonRequest(user.id, lessonId),
    onSuccess: () => {
      toast.success("Lesson successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["lessons"],
      });
      navigate("");
    },
    onError: (err) => {
      toast.error("Error while deleting lesson. " + err.message);
      console.log(err.message);
      throw new Error(err);
    },
  });

  return [deleteLesson, isDeleting];
}
