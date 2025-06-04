import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { enableCodeEditorRequest } from "../../services/apiSettings";

export function useEnableCodeEditor() {
  const queryClient = useQueryClient();
  const { mutate: enableCodeEditor, isPending: isEnablingCodeEditor } =
    useMutation({
      mutationFn: enableCodeEditorRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["settings"] });
        toast.success("Code editor enabled");
      },
      onError: () => {
        toast.error("Error while enabling editor");
      },
    });
  return { enableCodeEditor, isEnablingCodeEditor };
}
