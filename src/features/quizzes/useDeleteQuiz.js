import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { deleteQuizRequest } from "../../services/apiQuizzes";

export function useDeleteQuiz() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteQuiz, isPending: isDeleting } = useMutation({
    mutationFn: (quizId) => deleteQuizRequest(quizId),
    onSuccess: () => {
      toast.success("Quiz successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["userQuizzes", "quizzes"] });
      navigate("/myQuizzes");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message);
      throw new Error(err);
    },
  });

  return { deleteQuiz, isDeleting };
}
