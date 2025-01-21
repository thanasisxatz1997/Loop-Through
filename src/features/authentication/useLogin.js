import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/courses");
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect.");
    },
  });

  useEffect(() => {
    if (isSuccess) {
      // This is just a safety net to ensure navigation happens. Might remove
      navigate("/courses");
    }
  }, [isSuccess, navigate]);

  return { login, isLoading };
}
