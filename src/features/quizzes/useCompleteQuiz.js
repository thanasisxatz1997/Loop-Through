import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeQuizRequest } from "../../services/apiQuizzes";

export function useCompleteQuiz() {
  const queryClient = useQueryClient();

  const { mutateAsync: completeQuiz, isPending: isCompleting } = useMutation({
    mutationFn: (quizAnswers) => completeQuizRequest(quizAnswers),
    onSuccess: () => {
      toast.success("Quiz completed successfully.");
      //   queryClient.invalidateQueries({
      //     queryKey: ["completedQuiz"],
      //   });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message);
      throw new Error(err);
    },
  });

  return { completeQuiz, isCompleting };
}
