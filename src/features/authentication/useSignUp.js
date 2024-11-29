import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: signUp,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: ({ email, password }) => signUpApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/courses");
    },
    onError: (error) => {
      toast.error("Error while signing up. ", error.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      // This is just a safety net to ensure navigation happens Might remove
      navigate("/courses");
    }
  }, [isSuccess, navigate]);

  return { signUp, isLoading };
}
