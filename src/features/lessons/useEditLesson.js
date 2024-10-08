import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLesson } from "../../services/apiLessons";
import toast from "react-hot-toast";

export function useEditLesson() {
  const queryClient = useQueryClient();

  const { mutate: editLesson, isPending: isEditing } = useMutation({
    mutationFn: (lesson) => updateLesson(lesson),
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

  return [editLesson, isEditing];
}
