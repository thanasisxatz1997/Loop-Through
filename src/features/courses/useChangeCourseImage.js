import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeCourseImageRequest } from "../../services/apiCourses";
import toast from "react-hot-toast";

export function useChangeCourseImage() {
  const queryClient = useQueryClient();

  const { mutate: changeCourseImage, isPending: isChangingCourseImage } =
    useMutation({
      mutationFn: ({ course, newImage }) =>
        changeCourseImageRequest(course, newImage),
      onSuccess: () => {
        toast.success("Image successfully updated");
        queryClient.invalidateQueries({ queryKey: ["userCourses"] });
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { changeCourseImage, isChangingCourseImage };
}
