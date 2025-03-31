import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { runPythonCodeApi } from "../services/codeService";

export function useRunPythonCode() {
  const queryClient = useQueryClient();

  const { mutateAsync: runPythonCode, isPending: isRunningCode } = useMutation({
    mutationFn: runPythonCodeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codeOutput"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { runPythonCode, isRunningCode };
}
