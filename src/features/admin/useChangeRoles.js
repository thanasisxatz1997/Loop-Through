import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeRolesRequest } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useChangeRoles() {
  const queryClient = useQueryClient;

  const { mutate: changeRoles, isPending: isChangingRoles } = useMutation({
    mutationFn: (roles) => changeRolesRequest(roles),
    onSuccess: () => {
      toast.success("Roles successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error("Error while updating roles.");
      throw new Error(err);
    },
  });
  return { changeRoles, isChangingRoles };
}
