import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { disableCodeEditorRequest } from "../../services/apiSettings";

export function useDisableCodeEditor() {
  const queryClient = useQueryClient();
  const { mutate: disableCodeEditor, isPending: isDisablingCodeEditor } =
    useMutation({
      mutationFn: disableCodeEditorRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["settings"] });
        toast.success("Code editor disabled");
      },
      onError: () => {
        toast.error("Error while disabling editor");
        throw new Error("Error while disabling editor");
      },
    });
  return { disableCodeEditor, isDisablingCodeEditor };
}
