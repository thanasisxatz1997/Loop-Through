import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateQuiz } from "../../services/apiQuizzes";

export function useEditQuiz() {
  const queryClient = useQueryClient();

  const { mutate: editQuiz, isPending: isEditing } = useMutation({
    mutationFn: (quiz) => updateQuiz(quiz),
    onSuccess: () => {
      toast.success("Quiz successfully updated.");
      queryClient.invalidateQueries({
        queryKey: ["quiz"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message);
      throw new Error(err);
    },
  });

  return { editQuiz, isEditing };
}
